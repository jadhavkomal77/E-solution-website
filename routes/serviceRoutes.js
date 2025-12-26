import express from "express";
import {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import Admin from "../models/Admin.js";
import Service from "../models/Service.js";

const router = express.Router();

/* =======================
   🌐 PUBLIC ROUTES (NO AUTH)
======================= */

// Get services by website slug
// 🌍 PUBLIC → Get services by website slug
router.get("/public/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const admin = await Admin.findOne({
      websiteSlug: slug,
      isActive: true,
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }

    // 🔥 ONLY THIS ADMIN SERVICES
    const services = await Service.find({
      adminId: admin._id,
      status: true,
    });

    res.json({
      success: true,
      services,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ PUBLIC → single service by ID
router.get("/public/details/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =======================
   🔐 ADMIN ROUTES (AUTH)
======================= */

router.use(verifyToken, adminOnly);

// Admin → Get own services
router.get("/all", getServices);

// Admin → Get single service
router.get("/:id", getServiceById);

// Admin → Add new service
router.post("/add", addService);

// Admin → Update service
router.put("/update/:id", updateService);

// Admin → Delete service
router.delete("/delete/:id", deleteService);

export default router;
