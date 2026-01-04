


// import About from "../../models/admin/About.js";
// import sanitizeHtml from "sanitize-html";

// /* ======================================================
//    GET ABOUT (Public + Admin Secure)
// ====================================================== */
// export const getAbout = async (req, res) => {
//   try {
//     const adminId = req.user?.id || req.adminId;

//     if (!adminId) {
//       return res.status(400).json({ message: "Admin not resolved" });
//     }

//     let about = await About.findOne({ adminId });

//     if (!about) {
//       about = await About.create({
//         adminId,
//         mainTitle: "",
//         mainDescription: "",
//         features: [],
//         whyChoose: [],
//         stats: { year: "", projects: "", satisfaction: "", coverage: "" },
//       });
//     }

//     res.json({ success: true, data: about });
//   } catch (err) {
//     console.error("ABOUT FETCH ERROR:", err.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* ======================================================
//    UPDATE ABOUT (ADMIN PROTECTED)
// ====================================================== */
// export const updateAbout = async (req, res) => {
//   try {
//     const adminId = req.user.id;

//     if (!adminId) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     let { mainTitle, mainDescription, features, whyChoose, stats } = req.body;

//     // 🛡 Input Sanitization (XSS Protection)
//     mainTitle = sanitizeHtml(mainTitle || "");
//     mainDescription = sanitizeHtml(mainDescription || "");

//     if (Array.isArray(features)) {
//       features = features.map((f) => sanitizeHtml(f));
//     }

//     if (Array.isArray(whyChoose)) {
//       whyChoose = whyChoose.map((f) => sanitizeHtml(f));
//     }

//     if (stats) {
//       stats.year = sanitizeHtml(stats.year || "");
//       stats.projects = sanitizeHtml(stats.projects || "");
//       stats.satisfaction = sanitizeHtml(stats.satisfaction || "");
//       stats.coverage = sanitizeHtml(stats.coverage || "");
//     }

//     const updated = await About.findOneAndUpdate(
//       { adminId },
//       {
//         mainTitle,
//         mainDescription,
//         features,
//         whyChoose,
//         stats,
//       },
//       { new: true, upsert: true }
//     );

//     res.json({
//       success: true,
//       message: "About updated successfully",
//       data: updated,
//     });
//   } catch (err) {
//     console.error("ABOUT UPDATE ERROR:", err.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };




import About from "../../models/admin/About.js";
import sanitizeHtml from "sanitize-html";

export const getAbout = async (req, res) => {
  const adminId = req.user?.id || req.adminId;
  let about = await About.findOne({ adminId });

  if (!about) {
    about = await About.create({ adminId });
  }

  res.json({
    success: true,
    mainTitle: about.mainTitle,
    mainDescription: about.mainDescription,
    features: about.features,
    whyChoose: about.whyChoose,
    stats: about.stats,
  });
};

export const updateAbout = async (req, res) => {
  const adminId = req.user.id;

  let { mainTitle, mainDescription, features, whyChoose, stats } = req.body;

  mainTitle = sanitizeHtml(mainTitle || "");
  mainDescription = sanitizeHtml(mainDescription || "");

  features = (features || []).map((f) => ({
    icon: sanitizeHtml(f.icon || ""),
    title: sanitizeHtml(f.title || ""),
    description: sanitizeHtml(f.description || ""),
  }));

  whyChoose = (whyChoose || []).map((f) => ({
    icon: sanitizeHtml(f.icon || ""),
    title: sanitizeHtml(f.title || ""),
    description: sanitizeHtml(f.description || ""),
  }));

  const updated = await About.findOneAndUpdate(
    { adminId },
    { mainTitle, mainDescription, features, whyChoose, stats },
    { new: true, upsert: true }
  );

  res.json({ success: true, ...updated.toObject() });
};
