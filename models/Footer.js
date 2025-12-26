import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    unique: true,
    required: true,
  },

  brandText: String,
  copyrightText: String,

  developedByText: String,
  showDevelopedBy: {
    type: Boolean,
    default: true,
  },

  /* 🔹 CONTACT INFO */
  contact: {
    phone: String,
    email: String,
    address: String,
  },

  /* 🔹 SOCIAL LINKS */
  socialLinks: {
    instagram: String,
    twitter: String,
    facebook: String,
    linkedin: String,
  },

  /* 🔹 FOOTER LINKS (Policies etc) */
  links: [
    {
      label: String,
      url: String,
      isActive: Boolean,
      order: Number,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Footer", footerSchema);
