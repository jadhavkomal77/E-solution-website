


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import path from "path";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import fs from "fs";
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import xssClean from "xss-clean";


// // Routes
// import adminRoutes from "./routes/adminRoutes.js";
// import heroRoutes from "./routes/admin/heroRoutes.js";
// import navbarRoutes from "./routes/admin/navbarRoutes.js"
// import aboutRoutes from "./routes/admin/aboutRoutes.js";
// import serviceRoutes from "./routes/admin/serviceRoutes.js";
// import productRoutes from "./routes/admin/productRoutes.js";
// import feedbackRoutes from "./routes/admin/feedbackRoutes.js";
// import footerRoutes from "./routes/admin/footerRoutes.js"

// import contactRoutes from "./routes/contactRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";
// import enquiryRoutes from "./routes/admin/enquiryRoutes.js";
// import activityRoutes from "./routes/activityRoutes.js";
// import paymentRoutes from "./routes/admin/paymentRoutes.js";

// import superAdminRoutes from "./routes/superAdminRoutes.js";
// import superAdminHeroRoutes from "./routes/superadmin/superAdminHeroRoutes.js";
// import superAdminAboutRoutes from "./routes/superadmin/superAdminAboutRoutes.js";
// import superAdminServiceRoutes from "./routes/superadmin/superAdminServiceRoutes.js";
// import superAdminProductRoutes from "./routes/superadmin/superAdminProductRoutes.js";
// import superAdminEnquiryRoutes from "./routes/superadmin/superAdminEnquiryRoutes.js";
// import superAdminFeedbackRoutes from "./routes/superadmin/superAdminFeedbackRoutes.js";
// import SuperAdminContactRoutes from "./routes/superadmin/SuperAdminContactRoutes.js";
// import superAdminFooterRoutes from "./routes/superadmin/superAdminFooterRoutes.js";
// import superAdminNavbarRoutes from "./routes/superadmin/superAdminNavbarRoutes.js";
// // import superadminpaymentRoutes from "./routes/superadmin/superadminpaymentRoutes.js";
// // import superadminpaymentSettingsRoutes from "./routes/superadmin/superadminpaymentSettingsRoutes.js";

// import superAdminPaymentRoutes from "./routes/superadmin/superAdminPaymentRoutes.js";
// import superadminpaymentSettingsRoutes from "./routes/superadmin/superadminpaymentSettingsRoutes.js";

// dotenv.config();
// const app = express();
// const __dirname = path.resolve();


// /* ===================== SECURITY MIDDLEWARE ===================== */
// app.use(helmet());
// app.use(mongoSanitize());
// app.use(xssClean());

// /* ===================== BASIC MIDDLEWARE ===================== */
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGINS
//       ? process.env.CORS_ORIGINS.split(",").map(origin => origin.trim())
//       : [
//           "http://localhost:5173",
//           "https://e-solution-website.onrender.com",
//         ],
//     credentials: true,
//   })
// );

// /* ===================== UPLOADS FOLDER ===================== */
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// /* ===================== STATIC FRONTEND ===================== */
// app.use(express.static(path.join(__dirname, "dist")));

// /* ===================== API ROUTES ===================== */
// app.use("/api/admin", adminRoutes);
// app.use("/api/navbar", navbarRoutes);
// app.use("/api/hero", heroRoutes);
// app.use("/api/about", aboutRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/enquiry", enquiryRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/footer", footerRoutes);
// app.use("/api/logs", activityRoutes);
// // app.use("/api/users", userRoutes);

// // superadmin
// app.use("/api/superadmin", superAdminRoutes);

// app.use("/api/superadminnavbar", superAdminNavbarRoutes);
// app.use("/api/superhero", superAdminHeroRoutes);
// app.use("/api/superabout", superAdminAboutRoutes);
// app.use("/api/superadminservices", superAdminServiceRoutes);
// app.use("/api/superadminproducts", superAdminProductRoutes);
// app.use("/api/superadminenquiry", superAdminEnquiryRoutes);
// app.use("/api/superadminepayment", superAdminPaymentRoutes);
// app.use("/api/superadminfeedback", superAdminFeedbackRoutes);
// app.use("/api/superadmincontact", SuperAdminContactRoutes);
// app.use("/api/superadminfooter", superAdminFooterRoutes);
// app.use("/api/superadminpaymentsetting", superadminpaymentSettingsRoutes);


// // 🔥 React SPA fallback — Only for non-API routes
// app.get('*', (req, res) => {
//   if (req.path.startsWith('/api')) {
//     return res.status(404).json({ 
//       success: false,
//       message: "API route not found" 
//     });
//   }
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });



// /* ===================== SENTRY ERROR HANDLER ===================== */
// app.use(sentryErrorHandler);

// /* ===================== ERROR HANDLER ===================== */
// app.use((err, req, res, next) => {
//   console.error("Error:", err);
  
//   // Don't expose error details in production
//   const isDevelopment = process.env.NODE_ENV !== "production";
  
//   res.status(err.status || 500).json({
//     success: false,
//     message: isDevelopment 
//       ? (err.message || "Internal Server Error")
//       : "Internal Server Error",
//     ...(isDevelopment && { stack: err.stack })
//   });
// });

// /* ===================== DATABASE + SERVER ===================== */
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URL, {
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//     maxPoolSize: 10,
//     retryWrites: true,
//   })
//   .then(() => {
//     console.log("✅ MONGO CONNECTED");
//     app.listen(PORT, () => {
//       console.log(`🚀 SERVER RUNNING on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";

// ROUTES
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import enquiryRoutes from "./routes/admin/enquiryRoutes.js";
import paymentRoutes from "./routes/admin/paymentRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
// ADMIN / TENANT PUBLIC ROUTES
import navbarRoutes from "./routes/admin/navbarRoutes.js";
import heroRoutes from "./routes/admin/heroRoutes.js";
import aboutRoutes from "./routes/admin/aboutRoutes.js";
import serviceRoutes from "./routes/admin/serviceRoutes.js";
import productRoutes from "./routes/admin/productRoutes.js";
import feedbackRoutes from "./routes/admin/feedbackRoutes.js";
import footerRoutes from "./routes/admin/footerRoutes.js";

import superAdminRoutes from "./routes/superAdminRoutes.js";
import superAdminHeroRoutes from "./routes/superadmin/superAdminHeroRoutes.js";
import superAdminAboutRoutes from "./routes/superadmin/superAdminAboutRoutes.js";
import superAdminServiceRoutes from "./routes/superadmin/superAdminServiceRoutes.js";
import superAdminProductRoutes from "./routes/superadmin/superAdminProductRoutes.js";
import superAdminEnquiryRoutes from "./routes/superadmin/superAdminEnquiryRoutes.js";
import superAdminFeedbackRoutes from "./routes/superadmin/superAdminFeedbackRoutes.js";
import superAdminFooterRoutes from "./routes/superadmin/superAdminFooterRoutes.js";
import superAdminNavbarRoutes from "./routes/superadmin/superAdminNavbarRoutes.js";
import superAdminPaymentRoutes from "./routes/superadmin/superAdminPaymentRoutes.js";
import superAdminPaymentSettingRoutes from "./routes/superadmin/superadminpaymentSettingsRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

/* ================= BASIC MIDDLEWARE ================= */
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

/* ================= UPLOADS FOLDER ================= */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* ================= STATIC FRONTEND ================= */
app.use(express.static(path.join(__dirname, "dist")));


// TENANT PUBLIC + ADMIN
app.use("/api/admin", adminRoutes);

app.use("/api/navbar", navbarRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/enquiry", enquiryRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/logs", activityRoutes);


// SUPER ADMIN
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/superadminnavbar", superAdminNavbarRoutes);
app.use("/api/superhero", superAdminHeroRoutes);
app.use("/api/superabout", superAdminAboutRoutes);
app.use("/api/superadminservices", superAdminServiceRoutes);
app.use("/api/superadminproducts", superAdminProductRoutes);
app.use("/api/superadminenquiry", superAdminEnquiryRoutes);
app.use("/api/superadminfeedback", superAdminFeedbackRoutes);
app.use("/api/superadminfooter", superAdminFooterRoutes);
app.use("/api/superadminpayment", superAdminPaymentRoutes);
app.use("/api/superadminpaymentsetting", superAdminPaymentSettingRoutes);

/* ================= REACT SPA FALLBACK (IMPORTANT) ================= */
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ message: "Server Error" });
});

/* ================= DATABASE + SERVER ================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });
