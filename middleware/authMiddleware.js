

// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   try {
//     let token;
//     const base = req.baseUrl;

//     // 🔐 ONLY COOKIES (NO HEADER)
//     if (base.startsWith("/api/superadmin")) {
//       token = req.cookies?.superToken;
//     } 
//     else if (
//       base.startsWith("/api/admin") ||
//       base.startsWith("/api/services") ||
//       base.startsWith("/api/contact")||
//       base.startsWith("/api/products")||
//         base.startsWith("/api/feedback") ||
//          base.startsWith("/api/enquiry") ||
//           base.startsWith("/api/about") || 
//             base.startsWith("/api/hero")  
//     ) {
//       token = req.cookies?.adminToken;
//     } 
//     else if (base.startsWith("/api/user")) {
//       token = req.cookies?.userToken;
//     }

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.user = decoded; // { id, role }

//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Forbidden" });
//   }
// };


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
    let token;
    const base = req.baseUrl;

    // 🔐 SUPER ADMIN
    if (base.startsWith("/api/superadmin")) {
      token = req.cookies?.superToken;
    }

    // 🔐 ADMIN (ONLY PROTECTED ROUTES)
    else if (
      base.startsWith("/api/admin") ||
      (base.startsWith("/api/services") && !base.includes("/public")) ||
     (base.startsWith("/api/contact") && !base.includes("/public"))||
    (base.startsWith("/api/feedback") && !base.includes("/public"))||
    (base.startsWith("/api/about") && !base.includes("/public"))||
    (base.startsWith("/api/navbar") && !base.includes("/public"))||
    (base.startsWith("/api/products") && !base.includes("/public"))||
    (base.startsWith("/api/enquiry") && !base.includes("/public"))||
    (base.startsWith("/api/hero") && !base.includes("/public"))||
    (base.startsWith("/api/payment") && !base.includes("/public"))||
    (base.startsWith("/api/footer") && !base.includes("/public"))
    ) {
      token = req.cookies?.adminToken;
    }

    // 🔐 USER
    else if (base.startsWith("/api/user")) {
      token = req.cookies?.userToken;
    }

    // 🌍 PUBLIC ROUTES (NO TOKEN)
    else {
      return next();
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // { id, role }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

// ================= ROLE CHECK =================

export const roleCheck = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

export const adminOnly = roleCheck("admin");
export const superAdminOnly = roleCheck("superadmin");
export const adminAndSuper = roleCheck("admin", "superadmin");
