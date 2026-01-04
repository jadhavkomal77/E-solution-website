

import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProductPublic,
  getPublicProductsBySlug,
  getAdminSingleProduct
} from "../../controllers/admin/productController.js";

import { verifyToken, adminOnly } from "../../middleware/authMiddleware.js";
import { uploadSingle } from "../../utils/upload.js"; 

const router = express.Router();

/* ====================================================
   🌍 PUBLIC ROUTES — Visible on User Website
==================================================== */
router.get("/public/:slug", getPublicProductsBySlug);
router.get("/public/:slug/:id", getSingleProductPublic);

/* ====================================================
   🔐 ADMIN ROUTES — Protected by Token
==================================================== */
router.post(
  "/add",
  verifyToken,
  adminOnly,
  uploadSingle("image"), // 📌 Product image upload
  addProduct
);

router.get(
  "/all",
  verifyToken,
  adminOnly,
  getProducts
);
router.get(
  "/:id",
  verifyToken,
  adminOnly,
  getAdminSingleProduct
);

router.put(
  "/update/:id",
  verifyToken,
  adminOnly,
  uploadSingle("image"), // 📌 image optional
  updateProduct
);

router.delete(
  "/delete/:id",
  verifyToken,
  adminOnly,
  deleteProduct
);

export default router;
