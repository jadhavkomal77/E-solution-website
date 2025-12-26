import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getMyFeedbacks,
  deleteFeedback,
  createPublicFeedback
} from "../controllers/feedbackController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";

const router = express.Router();
// 🌍 PUBLIC
router.post(
  "/public/:slug",
  attachAdminId,
  createPublicFeedback
);

// 👤 USER
router.post("/", verifyToken, createFeedback);
router.get("/my", verifyToken, getMyFeedbacks);

// 🛡️ ADMIN
router.get("/", verifyToken, adminOnly, getAllFeedbacks);
router.delete("/:id", verifyToken, adminOnly, deleteFeedback);


export default router;
