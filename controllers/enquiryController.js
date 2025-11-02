import Enquiry from "../models/Enquiry.js";

/**
 * ✅ POST /api/enquiry
 * Create new enquiry (User)
 */
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be filled" });
    }

    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("❌ createEnquiry error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ✅ GET /api/enquiry
 * Get all enquiries (Admin)
 */
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("❌ getAllEnquiries error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch enquiries" });
  }
};

/**
 * ✅ GET /api/enquiry/my
 * Get current user's enquiries
 * (If you have auth middleware)
 */
export const getMyEnquiries = async (req, res) => {
  try {
    const userId = req.user?._id; // if you have auth
    const enquiries = await Enquiry.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("❌ getMyEnquiries error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};

/**
 * ✅ PUT /api/enquiry/:id/status
 * Update enquiry status (Admin)
 */
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedEnquiry,
    });
  } catch (error) {
    console.error("❌ updateEnquiryStatus error:", error);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

/**
 * ✅ DELETE /api/enquiry/:id
 * Delete enquiry (Admin)
 */
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("❌ deleteEnquiry error:", error);
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};
