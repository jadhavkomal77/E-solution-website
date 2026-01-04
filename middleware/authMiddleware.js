
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   try {
//     const base = req.baseUrl;
//     let token;

//     // 🔐 SUPER ADMIN PROTECTED ROUTES (not public)
//     if (
//       base.startsWith("/api/superadmin") ||
//       (base.startsWith("/api/superhero") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/superabout") && !req.path.includes("/public"))||
//       (base.startsWith("/api/superadminservices") && !req.path.includes("/public"))||
//       (base.startsWith("/api/superadminproducts") && !req.path.includes("/public"))||
//       (base.startsWith("/api/superadminenquiry") && !req.path.includes("/public"))
//     ) {
//       token = req.cookies?.superToken;
//     }

//     // 🔐 ADMIN PROTECTED ROUTES
//     else if (
//       (base.startsWith("/api/admin")) ||
//       (base.startsWith("/api/about") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/navbar") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/products") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/enquiry") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/hero") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/payment") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/footer") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/services") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/feedback") && !req.path.includes("/public")) ||
//       (base.startsWith("/api/contact") && !req.path.includes("/public"))
//     ) {
//       token = req.cookies?.adminToken;
//     }

//     // 🌍 NO TOKEN required for public
//     else {
//       return next();
//     }

//     if (!token)
//       return res.status(401).json({ message: "Unauthorized: Missing Token" });

//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Forbidden: Invalid Token" });
//   }
// };


// // Role Restriction
// export const roleCheck = (...roles) => (req, res, next) => {
//   if (!req.user || !roles.includes(req.user.role)) {
//     return res.status(403).json({ message: "Access Denied" });
//   }
//   next();
// };

// export const adminOnly = roleCheck("admin");
// export const superAdminOnly = roleCheck("superadmin");
// export const adminAndSuper = roleCheck("admin", "superadmin");




import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const base = req.baseUrl.toLowerCase();
    const path = req.path.toLowerCase();

    // 🌍 Public route skip token check
    if (path.includes("public")) return next();

    let token = null;
    let expectedRole = null;

    // =============================
    // 🔐 SUPERADMIN PROTECTED ROUTES
    // =============================
    if (
      base.includes("/api/superadmin") ||
      base.includes("/api/superabout") ||
      base.includes("/api/superhero") ||
      base.includes("/api/superadminservices") ||
      base.includes("/api/superadminproducts") ||
      base.includes("/api/superadminenquiry")||
      base.includes("/api/superadminfeedback")||
      base.includes("/api/superadmincontact")||
      base.includes("/api/superadminfooter")||
      base.includes("/api/superadminnavbar")||
      base.includes("/api/superadminepayment")||
      base.includes("/api/superadminpaymentsetting")
    ) {
      token = req.cookies?.superToken;
      expectedRole = "superadmin";
    }

    // ====================
    // 🔐 ADMIN PROTECTED ROUTES
    // ====================
    else if (
      base.includes("/api/admin") ||
      base.includes("/api/about") ||
      base.includes("/api/navbar") ||
      base.includes("/api/products") ||
      base.includes("/api/enquiry") ||
      base.includes("/api/hero") ||
      base.includes("/api/payment") ||
      base.includes("/api/footer") ||
      base.includes("/api/services") ||
      base.includes("/api/feedback") ||
      base.includes("/api/contact")
    ) {
      token = req.cookies?.adminToken;
      expectedRole = "admin";
    }

    // 🌍 Everything else = Public Route
    else {
      return next();
    }

    // ⛔ Token Missing
    if (!token) {
      return res.status(401).json({ message: "Please Login First!" });
    }

    // 🔍 Verify Token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // ⛔ Wrong Role (Security Protection)
    if (decoded.role !== expectedRole) {
      return res.status(403).json({ message: "Access Denied" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

// 📌 Role-based extra layer (optional use)
export const roleCheck = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

export const adminOnly = roleCheck("admin");
export const superAdminOnly = roleCheck("superadmin");
export const adminAndSuper = roleCheck("admin", "superadmin");
