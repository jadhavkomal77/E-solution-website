import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import WebsiteSettings from "../models/WebsiteSettings.js";

export const getWebsiteData = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find Admin by slug
    const admin = await Admin.findOne({ websiteSlug: slug }).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const adminId = admin._id;

    // Fetch admin website data
    const [settings, products, services] = await Promise.all([
      WebsiteSettings.findOne({ adminId }),
      Product.find({ createdBy: adminId }).sort({ createdAt: -1 }),
      Service.find({ adminId }).sort({ createdAt: -1 })
    ]);

    return res.json({
      success: true,
      admin,
      settings,
      products,
      services
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
