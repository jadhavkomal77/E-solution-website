// // middleware/assignId.js

// export const attachAdminId = (req, res, next) => {
//   try {
//     const adminId = req.params.adminId;

//     if (!adminId) {
//       return res.status(400).json({ message: "Admin ID missing in URL" });
//     }

//     // ⭐ Add adminId directly in body so controller can read it
//     req.body.adminId = adminId;

//     next();
//   } catch (error) {
//     console.error("attachAdminId Error:", error);
//     res.status(500).json({ message: "Middleware Error", error: error.message });
//   }
// };


// middleware/assignId.js
import Admin from "../models/Admin.js";

export const attachAdminId = async (req, res, next) => {
  try {
    let adminId = null;

    // 🟢 1️⃣ Old flow support (URL based)
    if (req.params?.adminId) {
      adminId = req.params.adminId;
    }

    // 🟢 2️⃣ New flow support (auto resolve admin)
    if (!adminId) {
      const admin = await Admin.findOne({ isActive: true });
      if (admin) adminId = admin._id;
    }

    // ❌ If still not found
    if (!adminId) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // ⭐ Attach in both places for backward compatibility
    req.adminId = adminId;
    req.body.adminId = adminId;

    next();
  } catch (error) {
    console.error("attachAdminId Error:", error);
    res.status(500).json({ message: "Middleware Error", error: error.message });
  }
};
