
// routes/paymentRoutes.js
import express from "express";
import { createRazorpayOrder, getAdminPayment, getPublicPaymentBySlug, updateAdminPayment, verifyRazorpayPayment } from "../../controllers/admin/paymentController.js";
import { adminOnly, verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", verifyToken, adminOnly, getAdminPayment);
router.put("/admin", verifyToken, adminOnly, updateAdminPayment);

router.get("/public/:slug", getPublicPaymentBySlug);

router.post("/razorpay/order", createRazorpayOrder);
router.post("/razorpay/verify", verifyRazorpayPayment);


export default router;

