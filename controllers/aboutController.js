// controllers/aboutController.js
import About from "../models/About.js";

/* ======================================================
   GET ABOUT
   - Admin panel  → req.user.id
   - Public site  → req.adminId (from attachAdminId)
====================================================== */
export const getAbout = async (req, res) => {
  try {
    // 🔑 Resolve adminId from either source
    const adminId = req.user?.id || req.adminId;

    if (!adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    let about = await About.findOne({ adminId });

    // 🆕 First time → create empty about for that admin
    if (!about) {
      about = await About.create({
        adminId,
        mainTitle: "",
        mainDescription: "",
        features: [],
        whyChoose: [],
        stats: {
          year: "",
          projects: "",
          satisfaction: "",
          coverage: "",
        },
      });
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   UPDATE ABOUT (ADMIN ONLY)
====================================================== */
export const updateAbout = async (req, res) => {
  try {
    const adminId = req.user.id; // 🔐 logged-in admin only

    const updated = await About.findOneAndUpdate(
      { adminId },                 // ⭐ KEY → per admin document
      {
        $set: {
          ...req.body,
          adminId,
        },
      },
      {
        new: true,
        upsert: true,              // 🆕 create if not exists
      }
    );

    res.json({
      success: true,
      message: "About page updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
