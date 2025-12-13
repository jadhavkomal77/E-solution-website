
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs"; 
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";



dotenv.config({ path: "./.env" });

const app = express();
const __dirname = path.resolve();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 'uploads' folder created automatically");
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-solution-website.onrender.com"
    ],
    credentials: true,
  })
);



// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/products", productRoutes);

app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/logs", activityRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Resource Not Found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message || "Something Went Wrong" });
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("✅ MONGO CONNECTED");
  app.listen(process.env.PORT, () => {
    console.log(`🚀 SERVER RUNNING on port ${process.env.PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MONGO CONNECTION ERROR:", err);
});
