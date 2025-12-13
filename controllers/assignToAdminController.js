import Admin from "../models/Admin.js";

export const assignToAdmin = async (req, res) => {
  try {
    const { adminId, products, services, slug } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const updated = await Admin.findByIdAndUpdate(
      adminId,
      {
        assignedProducts: products || [],
        assignedServices: services || [],
        websiteSlug: slug || "",
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      success: true,
      message: "Assignments Updated Successfully",
      admin: updated,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
