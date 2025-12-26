import Admin from "../models/Admin.js";
import Hero from "../models/Hero.js";

/* ===============================
   ADMIN: GET OWN HERO
================================ */
export const getAdminHero = async (req, res) => {
  try {
    const hero = await Hero.findOne({ adminId: req.adminId });
    res.json(hero); // null allowed
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hero" });
  }
};

/* ===============================
   ADMIN: ADD / UPDATE HERO
================================ */
export const updateHero = async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate(
      { adminId: req.adminId },
      req.body,
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Hero saved successfully",
      hero,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save hero",
      error: error.message,
    });
  }
};

/* ===============================
   ADMIN: DELETE HERO
================================ */
export const deleteHero = async (req, res) => {
  try {
    await Hero.findOneAndDelete({ adminId: req.adminId });

    res.json({
      success: true,
      message: "Hero deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hero" });
  }
};

/* ===============================
   PUBLIC: GET HERO
================================ */
export const getPublicHero = async (req, res) => {
  try {
    const { slug } = req.params;

    const admin = await Admin.findOne({
      websiteSlug: slug,
      isActive: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const hero = await Hero.findOne({ adminId: admin._id });

    res.status(200).json(hero || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PUBLIC HERO

// export const getPublicHero = async (req, res) => {
//   try {
//     const adminId = req.adminId;

//     if (!adminId) {
//       return res.status(400).json({ message: "AdminId missing" });
//     }

//     const hero = await Hero.findOne({ adminId });

//     if (!hero) {
//       return res.status(404).json({ message: "Hero not found" });
//     }

//     res.status(200).json(hero);
//   } catch (error) {
//     console.error("GET PUBLIC HERO ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
