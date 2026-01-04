// import express from "express";
// import {
//   adminLogin,
//   adminLogout,
//   getAdminProfile,
//   updateAdminProfile,
//   changeAdminPassword,
//   getMyProducts,
//   updateMyProduct,
//   deleteMyProduct,
//   getAdminStats,
// } from "../controllers/adminController.js";
// import { adminOnly, verifyToken } from "../middleware/authMiddleware.js";


// const router = express.Router();

// /* PUBLIC ROUTES */
// router.post("/login", adminLogin);

// /* PROTECTED ROUTES */
// router.post("/logout", verifyToken, adminOnly, adminLogout);
// router.get("/profile", verifyToken, adminOnly, getAdminProfile);
// router.put("/update-profile", verifyToken, adminOnly, updateAdminProfile);
// router.put("/change-password", verifyToken, adminOnly, changeAdminPassword);

// router.get("/my-products", verifyToken, adminOnly, getMyProducts);
// router.put("/update-product/:id", verifyToken, adminOnly, updateMyProduct);
// router.delete("/delete-product/:id", verifyToken, adminOnly, deleteMyProduct);

// router.get("/stats", verifyToken, adminOnly, getAdminStats);

// export default router;




import express from "express";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getMyProducts,
  updateMyProduct,
  deleteMyProduct,
  getAdminStats,
} from "../controllers/adminController.js";

import { adminOnly, verifyToken } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../utils/upload.js";
import { loginLimiter, sensitiveLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================== */
router.post("/login", loginLimiter, adminLogin);

/* ================= PROTECTED ROUTES ================ */
router.post("/logout", verifyToken, adminOnly, adminLogout);

router.get("/profile", verifyToken, adminOnly, getAdminProfile);

router.put(
  "/update-profile",
  verifyToken,
  adminOnly,
  uploadSingle("profile"), // 📌 Correct field
  updateAdminProfile
);

router.put(
  "/change-password",
  verifyToken,
  adminOnly,
  sensitiveLimiter,
  changeAdminPassword
);

router.get("/my-products", verifyToken, adminOnly, getMyProducts);

router.put(
  "/update-product/:id",
  verifyToken,
  adminOnly,
  uploadSingle("image"), // 📌 Correct
  updateMyProduct
);

router.delete("/delete-product/:id", verifyToken, adminOnly, deleteMyProduct);

router.get("/stats", verifyToken, adminOnly, getAdminStats);

export default router;
