// controllers/footerController.js
import Footer from "../models/Footer.js";

/* ======================================================
   GET FOOTER
   - Admin panel  → req.user.id
   - Public site  → req.adminId (from attachAdminId)
====================================================== */
export const getFooter = async (req, res) => {
  try {
    const adminId = req.user?.id || req.adminId;

    if (!adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    let footer = await Footer.findOne({ adminId });

    /* 🆕 First time → create default footer */
    if (!footer) {
      footer = await Footer.create({
        adminId,

        brandText: "",
        copyrightText: "",
        developedByText: "Website Designed & Developed by MVAD Eventful Endeavors Pvt Ltd",
        showDevelopedBy: true,

        contact: {
          phone: "",
          email: "",
          address: "",
        },

        socialLinks: {
          instagram: "",
          twitter: "",
          facebook: "",
          linkedin: "",
        },

        links: [],
      });
    }

    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   UPDATE FOOTER (ADMIN ONLY)
====================================================== */
export const updateFooter = async (req, res) => {
  try {
    const adminId = req.user.id;

    const updatedFooter = await Footer.findOneAndUpdate(
      { adminId },
      {
        $set: {
          ...req.body,
          adminId, // 🔒 always enforce admin ownership
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Footer updated successfully",
      footer: updatedFooter,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
