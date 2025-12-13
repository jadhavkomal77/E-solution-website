import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected
router.use(verifyToken);
router.get("/profile", getProfile);
router.post("/logout", logoutUser);

export default router;
