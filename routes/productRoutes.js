import express from "express";
import Upload from "../utils/upload.js";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProductPublic,
  getPublicProductsBySlug
} from "../controllers/productController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ⭐ PUBLIC ROUTES
// 🌍 PUBLIC ROUTES (slug based)
router.get("/public/:slug", getPublicProductsBySlug);
router.get("/public/:slug/:id", getSingleProductPublic);


// ⭐ ADMIN ROUTES
router.post("/add", verifyToken, adminOnly, Upload, addProduct);
router.get("/all", verifyToken, adminOnly, getProducts);
router.put("/update/:id", verifyToken, adminOnly, Upload, updateProduct);
router.delete("/delete/:id", verifyToken, adminOnly, deleteProduct);

export default router;
