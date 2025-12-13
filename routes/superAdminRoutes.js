
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
  getAllAdmins
} from "../controllers/superAdminController.js";

import { verifyToken, superAdminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ⭐ PUBLIC ROUTES (NO TOKEN REQUIRED)
router.post("/register", superAdminRegister);
router.post("/login", superAdminLogin);
console.log("SuperAdmin Routes Loaded!");

router.use(verifyToken, superAdminOnly);

// Routes below this line need superadmin auth
router.post("/logout", superAdminLogout);
router.get("/profile", getSuperAdminProfile);
router.put("/profile", updateSuperAdminProfile);

// Admin CRUD
router.post("/admin", createAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);
router.put("/admin/toggle/:id", toggleAdminStatus);
router.get("/admins", getAllAdmins);

export default router;
