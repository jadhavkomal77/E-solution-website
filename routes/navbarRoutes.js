import express from "express";
import { getPublicNavbar, saveNavbar } from "../controllers/navbarController.js";
import { adminOnly, verifyToken } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";

const router = express.Router();

// 🌍 PUBLIC
router.get("/public/:slug", attachAdminId, getPublicNavbar);
// 🛡️ ADMIN
router.post("/", verifyToken, adminOnly, saveNavbar);

export default router;
