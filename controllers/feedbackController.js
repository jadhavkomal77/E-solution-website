import Feedback from "../models/Feedback.js";

// ✅ Create feedback (User)
export const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!rating || !message || !name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feedback = await Feedback.create({
      userId: req.user.userId,
      name,
      email,
      rating,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully 🎉",
      result: feedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error saving feedback",
      error: err.message,
    });
  }
};


// ✅ Get All Feedbacks (Admin)
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
};


// ✅ Get user's feedbacks (User)
export const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      message: "Your feedbacks fetched",
      result: feedbacks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching your feedbacks",
      error: err.message,
    });
  }
};

// ✅ Delete feedback (Admin)
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting feedback",
      error: err.message,
    });
  }
};
