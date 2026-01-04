// import Navbar from "../models/Navbar.js";

// export const getPublicNavbar = async (req, res) => {
//   try {
//     const navbar = await Navbar.findOne({
//       adminId: req.adminId,
//     });

//     if (!navbar) {
//       return res.json({ buttons: [] });
//     }

//     res.json(navbar);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= ADMIN → SAVE / UPDATE NAVBAR ================= */
// export const saveNavbar = async (req, res) => {
//   try {
//     const { brandName, tagline, buttons } = req.body;

//     const navbar = await Navbar.findOneAndUpdate(
//       { adminId: req.user.id },
//       {
//         adminId: req.user.id,
//         brandName,
//         tagline,
//         buttons,
//       },
//       { upsert: true, new: true }
//     );

//     res.json({
//       success: true,
//       message: "Navbar updated successfully",
//       navbar,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



import Navbar from "../../models/admin/Navbar.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

/* ======================================================
   PUBLIC → GET NAVBAR BY WEBSITE (slug middleware)
====================================================== */
export const getPublicNavbar = async (req, res) => {
  try {
    if (!req.adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    const navbar = await Navbar.findOne({ adminId: req.adminId });

    return res.json({
  success: true,
  brandName: navbar?.brandName || "",
  tagline: navbar?.tagline || "",
  buttons: navbar?.buttons || [],
});


  } catch (err) {
    console.error("GET NAVBAR ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → SAVE / UPDATE NAVBAR (SECURE)
====================================================== */
export const saveNavbar = async (req, res) => {
  try {
    const adminId = req.user?.id;
    if (!adminId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let { brandName, tagline, buttons } = req.body;

    // Validate and sanitize text
    brandName = sanitizeHtml(brandName || "");
    tagline = sanitizeHtml(tagline || "");

    // Validate & sanitize menu links
  let cleanButtons = [];

if (Array.isArray(buttons)) {
  cleanButtons = buttons.map((btn) => ({
    label: sanitizeHtml(btn.label || ""),
    section: sanitizeHtml(btn.section || ""),
    path: sanitizeHtml(btn.path || ""),
    isPrimary: !!btn.isPrimary,
    isActive: btn.isActive !== false,
    order: Number(btn.order) || 0,
  }));
}


    const navbar = await Navbar.findOneAndUpdate(
      { adminId },
      {
        adminId,
        brandName,
        tagline,
        buttons: cleanButtons,
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Navbar updated successfully",
      navbar,
    });

  } catch (err) {
    console.error("NAVBAR UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
