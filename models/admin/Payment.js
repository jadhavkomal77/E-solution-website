
// models/PaymentSettings.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true
    },

    /* ===== UPI ===== */
    upiId: { type: String },
    upiName: { type: String },
    showUpi: { type: Boolean, default: true },

    /* ===== QR ===== */
    qrImage: { type: String }, // Cloudinary URL

    /* ===== Razorpay ===== */
    razorpayKeyId: { type: String },
    razorpayKeySecret: { type: String },
    razorpayEnabled: { type: Boolean, default: false },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
