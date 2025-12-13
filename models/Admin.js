import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    isActive: { type: Boolean, default: true },
    hero: { type: String },

    // ⭐ Unique website for every admin
    websiteSlug: { type: String, required: true, unique: true },

    assignedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    assignedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
