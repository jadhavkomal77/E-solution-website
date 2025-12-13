import express from "express";
import Upload from "../utils/upload.js";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getPublicProducts,
  getSingleProductPublic
} from "../controllers/productController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ⭐ PUBLIC ROUTES
router.get("/public", getPublicProducts);
router.get("/public/:id", getSingleProductPublic);

// ⭐ ADMIN ROUTES
router.post("/add", verifyToken, adminOnly, Upload, addProduct);
router.get("/all", verifyToken, adminOnly, getProducts);
router.put("/update/:id", verifyToken, adminOnly, Upload, updateProduct);
router.delete("/delete/:id", verifyToken, adminOnly, deleteProduct);

export default router;
