import WebsiteSettings from "../models/WebsiteSettings.js";
import cloudinary from "../utils/cloudinary.config.js";

/* =====================================================
   1️⃣ GET Website Settings (Admin Specific)
===================================================== */
export const getMyWebsiteSettings = async (req, res) => {
  try {
    const adminId = req.user.id;

    const settings = await WebsiteSettings.findOne({ adminId });

    return res.json({
      success: true,
      settings: settings || {}  // fallback to empty
    });

  } catch (err) {
    return res.status(500).json({ message: "Failed to load website settings" });
  }
};

/* =====================================================
   2️⃣ UPDATE Website Settings (logo + banner + favicon)
===================================================== */
export const updateWebsiteSettings = async (req, res) => {
  try {
    const adminId = req.user.id;

    let settings = await WebsiteSettings.findOne({ adminId });

    // Auto-create settings if not exist
    if (!settings) {
      settings = new WebsiteSettings({ adminId });
    }

    const updateData = req.body;  // title, subtitle, colors etc.

    /* =====================================================
       FILE UPLOAD HANDLING (Cloudinary)
    ====================================================== */
    if (req.files.logo) {
      const uploaded = await cloudinary.uploader.upload(req.files.logo[0].path);
      updateData.logo = uploaded.secure_url;
    }

    if (req.files.heroImage) {
      const uploaded = await cloudinary.uploader.upload(req.files.heroImage[0].path);
      updateData.heroImage = uploaded.secure_url;
    }

    if (req.files.favicon) {
      const uploaded = await cloudinary.uploader.upload(req.files.favicon[0].path);
      updateData.favicon = uploaded.secure_url;
    }

    // Save updated settings
    const updatedSettings = await WebsiteSettings.findOneAndUpdate(
      { adminId },
      updateData,
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      message: "Website settings updated successfully",
      settings: updatedSettings
    });

  } catch (err) {
    console.error("WEBSITE UPDATE ERROR:", err);
    return res.status(500).json({ message: "Failed to update website settings" });
  }
};
