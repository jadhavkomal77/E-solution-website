
import Admin from "../../models/Admin.js";
import Payment from "../../models/admin/Payment.js";

/* ======================
   🔐 ADMIN
====================== */

// GET
export const getAdminPayment = async (req, res) => {
  const payment = await Payment.findOne({ adminId: req.adminId });
  res.json(payment);
};

// ADD / UPDATE
export const saveAdminPayment = async (req, res) => {
  const payment = await Payment.findOneAndUpdate(
    { adminId: req.adminId },
    { ...req.body, adminId: req.adminId },
    { new: true, upsert: true }
  );

  res.json({ success: true, payment });
};

// DELETE
export const deleteAdminPayment = async (req, res) => {
  await Payment.findOneAndDelete({ adminId: req.adminId });
  res.json({ success: true });
};

/* ======================
   🌍 PUBLIC
====================== */

export const getPublicPayment = async (req, res) => {
  const { slug } = req.params;

  const admin = await Admin.findOne({
    websiteSlug: slug,
    isActive: true,
  });

  if (!admin) {
    return res.status(404).json({ message: "Website not found" });
  }

  const payment = await Payment.findOne({
    adminId: admin._id,
    isActive: true,
  });

  // IMPORTANT: return clean object
  if (!payment) return res.json(null);

  res.json({
    upiId: payment.upiId || "",
    phone: payment.phone || "",
    bankName: payment.bankName || "",
    accountNumber: payment.accountNumber || "",
    ifsc: payment.ifsc || "",
    isActive: payment.isActive,
  });
};









// import crypto from "crypto";
// import razorpay from "../../utils/razorpay.js";

// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // INR → paise
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     });

//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const body =
//       razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       return res.json({ success: true });
//     }

//     res.status(400).json({ success: false });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
