
import Admin from "../models/Admin.js";
import Feedback from "../models/Feedback.js";

  //  USER → CREATE FEEDBACK
// 👤 USER → CREATE FEEDBACK (LOGIN REQUIRED)
export const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Login required" });
    }

    const fb = await Feedback.create({
      name,
      email,
      rating,
      message,
      userId: req.user.id,    // ✅ OK
      adminId: req.adminId,   // ✅ from middleware
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: fb,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🌍 PUBLIC → CREATE FEEDBACK
export const createPublicFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ⭐ adminId already from attachAdminId
    const fb = await Feedback.create({
      name,
      email,
      rating,
      message,
      adminId: req.adminId,
      userId: null,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: fb,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/* ======================================================
   ADMIN → GET OWN FEEDBACKS
====================================================== */
export const getAllFeedbacks = async (req, res) => {
  try {
    const list = await Feedback.find({
      adminId: req.user.id, // ⭐ KEY LINE
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      feedbacks: list,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ======================================================
   USER → GET MY FEEDBACKS
====================================================== */
export const getMyFeedbacks = async (req, res) => {
  try {
    const list = await Feedback.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      feedbacks: list,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   ADMIN → DELETE OWN FEEDBACK
====================================================== */
export const deleteFeedback = async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);

    if (!fb)
      return res.status(404).json({ message: "Feedback not found" });

    if (fb.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await fb.deleteOne();

    res.json({
      success: true,
      message: "Feedback deleted",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
