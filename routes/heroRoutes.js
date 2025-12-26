import express from "express";
import {
  getAdminHero,
  updateHero,
  deleteHero,
  getPublicHero,
} from "../controllers/heroController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";

const router = express.Router();

/* ========= ADMIN PANEL ========= */

// GET own hero
router.get(
  "/admin",
  verifyToken,
  adminOnly,
  attachAdminId,
  getAdminHero
);

// ADD / UPDATE hero
router.post(
  "/",
  verifyToken,
  adminOnly,
  attachAdminId,
  updateHero
);

// DELETE hero
router.delete(
  "/",
  verifyToken,
  adminOnly,
  attachAdminId,
  deleteHero
);

/* ========= PUBLIC WEBSITE ========= */

// Public hero (no login)
router.get("/public/:slug", getPublicHero);


export default router;
