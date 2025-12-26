import express from "express";
import {
  getAdminPayment,
  saveAdminPayment,
  deleteAdminPayment,
  getPublicPayment,
} from "../controllers/paymentController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";

const router = express.Router();

/* 🔐 ADMIN */
router.get("/admin", verifyToken, adminOnly, attachAdminId, getAdminPayment);
router.post("/", verifyToken, adminOnly, attachAdminId, saveAdminPayment);
router.delete("/", verifyToken, adminOnly, attachAdminId, deleteAdminPayment);

/* 🌍 PUBLIC */
router.get("/public/:slug", getPublicPayment);

export default router;
