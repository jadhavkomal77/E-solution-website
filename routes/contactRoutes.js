import express from "express";
import { createContact, getAllContacts, deleteContact } from "../controllers/contactController.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/", createContact);

// ADMIN
router.get("/", verifyToken, adminOnly, getAllContacts);
router.delete("/:id", verifyToken, adminOnly, deleteContact);

export default router;
