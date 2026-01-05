// import mongoose from "mongoose";

// const footerSchema = new mongoose.Schema({
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin",
//     unique: true,
//     required: true,
//   },

//   brandText: String,
//   copyrightText: String,

//   developedByText: String,
//   showDevelopedBy: {
//     type: Boolean,
//     default: true,
//   },

//   /* 🔹 CONTACT INFO */
//   contact: {
//     phone: String,
//     email: String,
//     address: String,
//   },

//   /* 🔹 SOCIAL LINKS */
//   socialLinks: {
//     instagram: String,
//     twitter: String,
//     facebook: String,
//     linkedin: String,
//   },

//  links: [
//   {
//     label: String,
//     url: String,
//     type: {
//       type: String,
//       enum: ["quick", "important"],
//       default: "quick",
//     },
//     isActive: Boolean,
//     order: Number,
//   },
// ],

// }, { timestamps: true });

// export default mongoose.model("Footer", footerSchema);






import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    /* 🔐 OWNER (Multi-Tenant Key) */
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },

    brandText: { type: String, default: "" },
    copyrightText: { type: String, default: "" },

    developedByText: {
      type: String,
      default: "Designed & Developed by SuperAdmin",
    },
    showDevelopedBy: { type: Boolean, default: true },

    contact: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      address: { type: String, default: "" },
    },

    socialLinks: {
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },

    links: [
      {
        label: { type: String, default: "" },
        url: { type: String, default: "" },
        type: {
          type: String,
          enum: ["quick", "important"],
          default: "quick",
        },
        isActive: { type: Boolean, default: true },
        order: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Footer", footerSchema);
