import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getMyFeedbacks,
  deleteFeedback
} from "../controllers/feedbackController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";

const router = express.Router();

// User
// router.post("/:adminId", attachAdminId, verifyToken, createFeedback);
router.post("/", verifyToken, attachAdminId, createFeedback);

router.get("/my", verifyToken, getMyFeedbacks);

// Admin
router.get("/", verifyToken, adminOnly, getAllFeedbacks);
router.delete("/:id", verifyToken, adminOnly, deleteFeedback);

export default router;
