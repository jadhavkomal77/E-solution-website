// import jwt from "jsonwebtoken";

// export const isAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1] || req.cookies?.admin;

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.user = decoded;

//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: "Unauthorized: Invalid token", error: err.message });
//   }
// };



import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    // Try from Authorization header OR user/admin cookie
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.cookies?.user || // for user
      req.cookies?.admin;  // for admin

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // attach decoded data (userId, role, etc.)

    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", error: err.message });
  }
};
