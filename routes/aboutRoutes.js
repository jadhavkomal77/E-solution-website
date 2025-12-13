import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";

const router = express.Router();

// GET about page
router.get("/", getAbout);

// UPDATE about page
router.put("/", updateAbout);

export default router;
