import Payment from "../models/Payment.js";
import Admin from "../models/Admin.js";

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

  res.json(payment || null);
};
