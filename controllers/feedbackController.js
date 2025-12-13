import Feedback from "../models/Feedback.js";

/* ======================================================
   USER → CREATE FEEDBACK
====================================================== */
export const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    // Validation
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // adminId MUST come from middleware / context
    if (!req.adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    const fb = await Feedback.create({
      name,
      email,
      rating,
      message,
      userId: req.user.id,   // from token
      adminId: req.adminId,  // ⭐ secure source
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
    const list = await Feedback.find({ adminId: req.user.id })
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
