import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getMyFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

// User Routes
router.post("/", isAuth, createFeedback);
router.get("/my", isAuth, getMyFeedbacks);

// Admin Routes
router.get("/", isAuth, getAllFeedbacks);
router.delete("/:id", isAuth, deleteFeedback);

export default router;
