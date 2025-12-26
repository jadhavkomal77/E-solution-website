import express from "express";
import { saveHero, getHero } from "../controllers/mainHeroController.js";
import { superAdminProtect } from "../middlewares/superAdminAuth.js"; // If available

const router = express.Router();

// Super Admin controls this section
router.post("/", superAdminProtect, saveHero);

// Public homepage fetch
router.get("/", getHero);

export default router;
