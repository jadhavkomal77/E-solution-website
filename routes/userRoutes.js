

import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuth, getProfile);
router.get("/logout", logoutUser);

export default router;

