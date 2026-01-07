

import Admin from "../../models/Admin.js";
import Payment from "../../models/admin/Payment.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

/* =====================================================
   🔐 ADMIN : Get own payment settings
===================================================== */
export const getAdminPayment = async (req, res) => {
  try {
    const adminId = req.admin._id;

    const settings = await Payment.findOne({ adminId });

    res.json({
      success: true,
      data: settings || null,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   🔐 ADMIN : Create / Update payment settings
===================================================== */
export const updateAdminPayment = async (req, res) => {
  try {
    const adminId = req.admin._id;

    const cleanBody = {
      razorpayEnabled: req.body.razorpayEnabled,
      razorpayKeyId: sanitizeHtml(req.body.razorpayKeyId || ""),
      razorpayKeySecret: sanitizeHtml(req.body.razorpayKeySecret || ""),
      isActive: req.body.isActive,
    };

    const settings = await Payment.findOneAndUpdate(
      { adminId },
      cleanBody,
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Payment settings updated successfully",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* =====================================================
   🌍 PUBLIC : Get payment config by website slug
===================================================== */
export const getPublicPaymentBySlug = async (req, res) => {
  try {
    const cleanSlug = sanitizeHtml(req.params.slug?.toLowerCase());

    if (!cleanSlug) {
      return res.status(400).json({ message: "Slug missing" });
    }

    const admin = await Admin.findOne({
      websiteSlug: cleanSlug,
      isActive: true,
    }).select("name websiteSlug");

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const payment = await Payment.findOne({
      adminId: admin._id,
      razorpayEnabled: true,
      isActive: true,
    }).select("-razorpayKeySecret");

    res.json({
      success: true,
      admin,
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   💳 RAZORPAY : Create Order (PUBLIC)
===================================================== */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { slug, amount } = req.body;

    if (!validator.isNumeric(amount?.toString()) || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const cleanSlug = sanitizeHtml(slug?.toLowerCase());

    const admin = await Admin.findOne({
      websiteSlug: cleanSlug,
      isActive: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "Invalid website" });
    }

    const settings = await Payment.findOne({
      adminId: admin._id,
      razorpayEnabled: true,
      isActive: true,
    });

    if (!settings?.razorpayKeyId || !settings?.razorpayKeySecret) {
      return res.status(400).json({ message: "Razorpay not configured" });
    }

    const razorpay = new Razorpay({
      key_id: settings.razorpayKeyId,
      key_secret: settings.razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        adminId: admin._id.toString(),
        website: admin.websiteSlug,
      },
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Razorpay order failed" });
  }
};

/* =====================================================
   🔐 RAZORPAY : Verify Payment (MANDATORY FOR LIVE)
===================================================== */
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      slug,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const cleanSlug = sanitizeHtml(slug?.toLowerCase());

    const admin = await Admin.findOne({
      websiteSlug: cleanSlug,
      isActive: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "Invalid website" });
    }

    const settings = await Payment.findOne({
      adminId: admin._id,
      razorpayEnabled: true,
    });

    const generatedSignature = crypto
      .createHmac("sha256", settings.razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ Here you should save Order/Payment status in DB

    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};
