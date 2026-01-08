import express from "express";

import { getMyPaymentSettings, getPublicPaymentSettings, upsertPaymentSettings } from "../../controllers/admin/paymentController.js";
import { adminOnly } from "../../middleware/authMiddleware.js";
import { uploadSingle } from "../../utils/upload.js";

const router = express.Router();

/* Admin Panel */
router.get("/payment", adminOnly, getMyPaymentSettings);

router.post(
  "/payment",
  adminOnly,
  uploadSingle("qrImage"),
  upsertPaymentSettings
);

router.get("/payment/:slug", getPublicPaymentSettings);

export default router;
