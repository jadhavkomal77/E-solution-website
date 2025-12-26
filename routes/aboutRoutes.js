// routes/aboutRoutes.js
import express from "express";
import {
  getAbout,
  updateAbout,
} from "../controllers/aboutController.js";
import { adminOnly, verifyToken } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";

const router = express.Router();

/* ================= ADMIN PANEL ================= */
router.get(
  "/",
  verifyToken,
  adminOnly,
  getAbout
);

router.put(
  "/",
  verifyToken,
  adminOnly,
  updateAbout
);

/* ================= PUBLIC WEBSITE ================= */
router.get(
  "/public/:slug",
  attachAdminId,
  getAbout
);

export default router;
