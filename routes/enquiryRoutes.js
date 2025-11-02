import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  getMyEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js"; // if using auth

const router = express.Router();

// 🧑‍💼 User
router.post("/", createEnquiry);
router.get("/my", getMyEnquiries);

// 👨‍💼 Admin
router.get("/", getAllEnquiries);
router.put("/:id/status", updateEnquiryStatus);
router.delete("/:id", deleteEnquiry);

export default router;
