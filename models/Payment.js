import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true,
    },

    upiId: String,
    phone: String,
    bankName: String,
    accountNumber: String,
    ifsc: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
