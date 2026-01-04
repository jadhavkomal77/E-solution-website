
// import express from "express";
// import {
//   superAdminRegister,
//   superAdminLogin,
//   superAdminLogout,
//   getSuperAdminProfile,
//   updateSuperAdminProfile,
//   createAdmin,
//   updateAdmin,
//   deleteAdmin,
//   toggleAdminStatus,
//   getAllAdmins,
// } from "../controllers/superAdminController.js";
// import { verifyToken, superAdminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // PUBLIC
// router.post("/register", superAdminRegister);
// router.post("/login", superAdminLogin);

// // PROTECTED
// router.use(verifyToken, superAdminOnly);

// router.post("/logout", superAdminLogout);
// router.get("/profile", getSuperAdminProfile);
// router.put("/profile", updateSuperAdminProfile);

// router.post("/admin", createAdmin);
// router.put("/admin/:id", updateAdmin);
// router.delete("/admin/:id", deleteAdmin);
// router.put("/admin/toggle/:id", toggleAdminStatus);
// router.get("/admins", getAllAdmins);

// export default router;




import express from "express";
import {
  superAdminRegister,
  superAdminLogin,
  superAdminLogout,
  getSuperAdminProfile,
  updateSuperAdminProfile,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  getAllAdmins,
} from "../controllers/superAdminController.js";

import {
  verifyToken,
  superAdminOnly
} from "../middleware/authMiddleware.js";

import { uploadSingle } from "../utils/upload.js";
import {
  loginLimiter,
  sensitiveLimiter
} from "../middleware/rateLimiter.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */
router.post("/register", loginLimiter, superAdminRegister);
router.post("/login", loginLimiter, superAdminLogin);

/* ================ PROTECTED ROUTES ================ */
router.use(verifyToken, superAdminOnly);

// Logout — Safe (Blacklist token handled in controller)
router.post("/logout", superAdminLogout);

// Profile Get
router.get("/profile", getSuperAdminProfile);

// Profile Update — Secure file upload
router.put(
  "/profile",
  uploadSingle("profile"),
  updateSuperAdminProfile
);

// Admin Management CRUD
router.post("/admin", createAdmin);
router.put("/admin/:id", sensitiveLimiter, updateAdmin);
router.delete("/admin/:id", sensitiveLimiter, deleteAdmin);
router.put("/admin/toggle/:id", toggleAdminStatus);

// SuperAdmin → All Admins listing
router.get("/admins", getAllAdmins);

export default router;
