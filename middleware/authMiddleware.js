

// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   try {
//     let token;

//     // 1️⃣ Bearer Token (always use if provided)
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     // 2️⃣ Route-based cookie selection (fixes 403 forever)
//     if (!token) {
//       const base = req.baseUrl;

//       if (base.startsWith("/api/superadmin")) {
//         token = req.cookies?.superToken;
//       } else if (base.startsWith("/api/admin")) {
//         token = req.cookies?.adminToken;
//       } else if (base.startsWith("/api/user")) {
//         token = req.cookies?.userToken;
//       }
//     }

//     // 3️⃣ No token
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized — No Token Provided" });
//     }

//     // 4️⃣ Verify
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res
//       .status(403)
//       .json({ message: "Forbidden — Invalid or Expired Token" });
//   }
// };



// export const roleCheck = (...allowedRoles) => {
//   return (req, res, next) => {

//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized — No User Data" });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access Denied — Insufficient Permission" });
//     }

//     next();
//   };
// };


// // SuperAdmin only
// export const superAdminOnly = roleCheck("superadmin");

// // Admin only
// export const adminOnly = roleCheck("admin");

// // User only
// export const userOnly = roleCheck("user");

// // Admin + SuperAdmin both
// export const adminAndSuper = roleCheck("admin", "superadmin");




// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   try {
//     let token;

//     // 1️⃣ Header token (frontend admin panel)
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     // 2️⃣ Cookie fallback (old + safe)
//     if (!token) {
//       const base = req.baseUrl;

//       if (base.startsWith("/api/superadmin")) {
//         token = req.cookies?.superToken;
//       } else if (
//         base.startsWith("/api/admin") ||
//         base.startsWith("/api/services")
//       ) {
//         token = req.cookies?.adminToken;
//       } else if (base.startsWith("/api/user")) {
//         token = req.cookies?.userToken;
//       }
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

// ROLE CHECK


import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token;
    const base = req.baseUrl;

    // 🔐 ONLY COOKIES (NO HEADER)
    if (base.startsWith("/api/superadmin")) {
      token = req.cookies?.superToken;
    } 
    else if (
      base.startsWith("/api/admin") ||
      base.startsWith("/api/services") ||
      base.startsWith("/api/contact")||
      base.startsWith("/api/products")||
        base.startsWith("/api/feedback") ||
         base.startsWith("/api/enquiry")   
    ) {
      token = req.cookies?.adminToken;
    } 
    else if (base.startsWith("/api/user")) {
      token = req.cookies?.userToken;
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


export const roleCheck = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

export const adminOnly = roleCheck("admin");
export const superAdminOnly = roleCheck("superadmin");
export const adminAndSuper = roleCheck("admin", "superadmin");
