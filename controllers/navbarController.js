import Navbar from "../models/Navbar.js";

export const getPublicNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findOne({
      adminId: req.adminId,
    });

    if (!navbar) {
      return res.json({ buttons: [] });
    }

    res.json(navbar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADMIN → SAVE / UPDATE NAVBAR ================= */
export const saveNavbar = async (req, res) => {
  try {
    const { brandName, tagline, buttons } = req.body;

    const navbar = await Navbar.findOneAndUpdate(
      { adminId: req.user.id },
      {
        adminId: req.user.id,
        brandName,
        tagline,
        buttons,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Navbar updated successfully",
      navbar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
