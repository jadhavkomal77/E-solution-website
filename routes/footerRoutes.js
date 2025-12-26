import express from "express";
import { getFooter, updateFooter } from "../controllers/footerController.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";

const router = express.Router();

/* ===== ADMIN ===== */
router.get("/", verifyToken, adminOnly, getFooter);
router.put("/", verifyToken, adminOnly, updateFooter);

/* ===== PUBLIC ===== */
router.get("/public/:slug", attachAdminId, getFooter);

export default router;
