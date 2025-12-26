

// import Admin from "../models/Admin.js";

// export const attachAdminId = async (req, res, next) => {
//   try {
//     // 🔐 Admin panel
//     if (req.user?.id) {
//       req.adminId = req.user.id;
//       return next();
//     }

//     // 🌍 Public website (slug)
//     if (req.params?.slug) {
//       const admin = await Admin.findOne({
//         websiteSlug: req.params.slug,
//         isActive: true,
//       });

//       if (!admin) {
//         return res.status(404).json({ message: "Website not found" });
//       }

//       req.adminId = admin._id;
//       return next();
//     }

//     return res.status(400).json({ message: "AdminId not resolved" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// import Admin from "../models/Admin.js";

// export const attachAdminId = async (req, res, next) => {
//   try {
//     // 🔐 ADMIN PANEL (logged in admin)
//     if (req.user?.id) {
//       req.adminId = req.user.id;
//       return next();
//     }

//     // 🌍 PUBLIC WEBSITE (slug based)
//     if (req.params?.slug) {
//       const admin = await Admin.findOne({
//         slug: req.params.slug,   // ✅ ONLY CHANGE
//         isActive: true,
//       });

//       if (!admin) {
//         return res.status(404).json({ message: "Website not found" });
//       }

//       req.adminId = admin._id;
//       return next();
//     }

//     return res.status(400).json({ message: "AdminId not resolved" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



import Admin from "../models/Admin.js";

export const attachAdminId = async (req, res, next) => {
  try {
    // 🔐 ADMIN PANEL
    if (req.user?.id) {
      req.adminId = req.user.id;
      return next();
    }

    // 🌍 PUBLIC WEBSITE (slug based)
    if (req.params?.slug) {
      const admin = await Admin.findOne({
        websiteSlug: req.params.slug, // ✅ FIX HERE
        isActive: true,
      });
// const admin = await Admin.findOne({
//   slug: req.params.slug,
//   isActive: true,
// });

      if (!admin) {
        return res.status(404).json({ message: "Website not found" });
      }

      req.adminId = admin._id;
      return next();
    }

    return res.status(400).json({ message: "AdminId not resolved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
