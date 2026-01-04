


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import heroRoutes from "./routes/admin/heroRoutes.js";
import navbarRoutes from "./routes/admin/navbarRoutes.js"
import aboutRoutes from "./routes/admin/aboutRoutes.js";
import serviceRoutes from "./routes/admin/serviceRoutes.js";
import productRoutes from "./routes/admin/productRoutes.js";
import feedbackRoutes from "./routes/admin/feedbackRoutes.js";
import footerRoutes from "./routes/admin/footerRoutes.js"

import contactRoutes from "./routes/contactRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import enquiryRoutes from "./routes/admin/enquiryRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import paymentRoutes from "./routes/admin/paymentRoutes.js";

import superAdminRoutes from "./routes/superAdminRoutes.js";
import superAdminHeroRoutes from "./routes/superadmin/superAdminHeroRoutes.js";
import superAdminAboutRoutes from "./routes/superadmin/superAdminAboutRoutes.js";
import superAdminServiceRoutes from "./routes/superadmin/superAdminServiceRoutes.js";
import superAdminProductRoutes from "./routes/superadmin/superAdminProductRoutes.js";
import superAdminEnquiryRoutes from "./routes/superadmin/superAdminEnquiryRoutes.js";
import superAdminFeedbackRoutes from "./routes/superadmin/superAdminFeedbackRoutes.js";
import SuperAdminContactRoutes from "./routes/superadmin/SuperAdminContactRoutes.js";
import superAdminFooterRoutes from "./routes/superadmin/superAdminFooterRoutes.js";
import superAdminNavbarRoutes from "./routes/superadmin/superAdminNavbarRoutes.js";
// import superadminpaymentRoutes from "./routes/superadmin/superadminpaymentRoutes.js";
// import superadminpaymentSettingsRoutes from "./routes/superadmin/superadminpaymentSettingsRoutes.js";

import superAdminPaymentRoutes from "./routes/superadmin/superAdminPaymentRoutes.js";
import superadminpaymentSettingsRoutes from "./routes/superadmin/superadminpaymentSettingsRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

/* ===================== BASIC MIDDLEWARE ===================== */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-solution-website.onrender.com",
    ],
    credentials: true,
  })
);

/* ===================== UPLOADS FOLDER ===================== */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* ===================== STATIC FRONTEND ===================== */
app.use(express.static(path.join(__dirname, "dist")));

/* ===================== API ROUTES ===================== */
app.use("/api/admin", adminRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/logs", activityRoutes);
// app.use("/api/users", userRoutes);

// superadmin
app.use("/api/superadmin", superAdminRoutes);

app.use("/api/superadminnavbar", superAdminNavbarRoutes);
app.use("/api/superhero", superAdminHeroRoutes);
app.use("/api/superabout", superAdminAboutRoutes);
app.use("/api/superadminservices", superAdminServiceRoutes);
app.use("/api/superadminproducts", superAdminProductRoutes);
app.use("/api/superadminenquiry", superAdminEnquiryRoutes);
app.use("/api/superadminepayment", superAdminPaymentRoutes);
app.use("/api/superadminfeedback", superAdminFeedbackRoutes);
app.use("/api/superadmincontact", SuperAdminContactRoutes);
app.use("/api/superadminfooter", superAdminFooterRoutes);
app.use("/api/superadminpaymentsetting", superadminpaymentSettingsRoutes);


// 🔥 React SPA fallback — Express v5 SAFE
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



/* ===================== ERROR HANDLER ===================== */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ===================== DATABASE + SERVER ===================== */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MONGO CONNECTED");
    app.listen(PORT, () => {
      console.log(`🚀 SERVER RUNNING on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });
