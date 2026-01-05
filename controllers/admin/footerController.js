
// import Footer from "../../models/admin/Footer.js";
// import validator from "validator";
// import sanitizeHtml from "sanitize-html";

// /* ======================================================
//    GET FOOTER (Admin + Public)
// ====================================================== */
// export const getFooter = async (req, res) => {
//   try {
//     const adminId = req.user?.id || req.adminId;

//     if (!adminId) {
//       return res.status(400).json({ message: "Admin not resolved" });
//     }

//     let footer = await Footer.findOne({ adminId });

//     if (!footer) {
//       footer = await Footer.create({
//         adminId,
//         brandText: "",
//         copyrightText: "",
//         developedByText: "Website Designed & Developed by MVAD Eventful Endeavors Pvt Ltd",
//         showDevelopedBy: true,

//         contact: {
//           phone: "",
//           email: "",
//           address: "",
//         },

//         socialLinks: {
//           instagram: "",
//           twitter: "",
//           facebook: "",
//           linkedin: "",
//         },

//         links: [],
//       });
//     }

//     res.json({ success: true, data: footer });
//   } catch (err) {
//     console.error("FOOTER GET ERROR:", err.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


// /* ======================================================
//    UPDATE FOOTER (Secure & Admin Only)
// ====================================================== */
// /* ======================================================
//    UPDATE FOOTER (Secure & Admin Only)
// ====================================================== */
// export const updateFooter = async (req, res) => {
//   try {
//     const adminId = req.user?.id;
//     if (!adminId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const {
//       brandText,
//       copyrightText,
//       developedByText,
//       showDevelopedBy,
//       contact,
//       socialLinks,
//       links,
//     } = req.body;

//     // 🧹 SANITIZE BASIC TEXT
//     const cleanBrandText = sanitizeHtml(brandText || "");
//     const cleanCopyrightText = sanitizeHtml(copyrightText || "");
//     const cleanDevelopedByText = sanitizeHtml(developedByText || "");

//     // 📧 EMAIL VALIDATION
//     if (contact?.email && !validator.isEmail(contact.email)) {
//       return res.status(400).json({ message: "Invalid Email format" });
//     }

//     // 🔗 SOCIAL LINKS (URL only)
//     const cleanSocialLinks = {};
//     if (socialLinks) {
//       for (let key in socialLinks) {
//         const val = socialLinks[key];
//         cleanSocialLinks[key] =
//           val && validator.isURL(val, { require_protocol: true })
//             ? sanitizeHtml(val)
//             : "";
//       }
//     }

//     // 🔗 FOOTER LINKS (🔥 MAIN FIX 🔥)
//    const cleanFooterLinks = Array.isArray(links)
//   ? links.map((l, i) => ({
//       label: sanitizeHtml(l.label || ""),
//       url: sanitizeHtml(l.url || ""),
//       type: l.type === "important" ? "important" : "quick",
//       isActive: l.isActive ?? true,
//       order: i + 1,
//     }))
//   : [];


//     const updateData = {
//       brandText: cleanBrandText,
//       copyrightText: cleanCopyrightText,
//       developedByText: cleanDevelopedByText,
//       showDevelopedBy: showDevelopedBy ?? true,

//       contact: {
//         phone: sanitizeHtml(contact?.phone || ""),
//         email: contact?.email?.toLowerCase() || "",
//         address: sanitizeHtml(contact?.address || ""),
//       },

//       socialLinks: cleanSocialLinks,
//       links: cleanFooterLinks,
//       adminId,
//     };

//     const updated = await Footer.findOneAndUpdate(
//       { adminId },
//       updateData,
//       { new: true, upsert: true }
//     );

//     res.json({
//       success: true,
//       message: "Footer updated successfully",
//       data: updated,
//     });
//   } catch (err) {
//     console.error("FOOTER UPDATE ERROR:", err.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };




import sanitizeHtml from "sanitize-html";
import validator from "validator";
import Footer from "../../models/admin/Footer.js";

/* =====================================================
   GET FOOTER
   - Admin Panel  → req.user.id
   - Public Site  → req.adminId (middleware ने attach केलेला)
===================================================== */
export const getFooter = async (req, res) => {
  try {
    const adminId = req.user?.id || req.adminId;

    if (!adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    let footer = await Footer.findOne({ adminId });

    /* 🆕 First time admin → create default footer */
    if (!footer) {
      footer = await Footer.create({ adminId });
    }

    return res.json({
      success: true,
      data: footer,
    });
  } catch (err) {
    console.error("FOOTER GET ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   UPDATE FOOTER (Admin Panel Only)
===================================================== */
export const updateFooter = async (req, res) => {
  try {
    const adminId = req.user.id;

    const {
      brandText,
      copyrightText,
      developedByText,
      showDevelopedBy,
      contact,
      socialLinks,
      links,
    } = req.body;

    /* ✅ Email validation */
    if (contact?.email && !validator.isEmail(contact.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const updatedData = {
      adminId,

      brandText: sanitizeHtml(brandText || ""),
      copyrightText: sanitizeHtml(copyrightText || ""),
      developedByText: sanitizeHtml(developedByText || ""),
      showDevelopedBy,

      contact: {
        phone: sanitizeHtml(contact?.phone || ""),
        email: (contact?.email || "").toLowerCase(),
        address: sanitizeHtml(contact?.address || ""),
      },

      socialLinks: {
        instagram: sanitizeHtml(socialLinks?.instagram || ""),
        twitter: sanitizeHtml(socialLinks?.twitter || ""),
        facebook: sanitizeHtml(socialLinks?.facebook || ""),
        linkedin: sanitizeHtml(socialLinks?.linkedin || ""),
      },

      links: Array.isArray(links)
        ? links.map((l, i) => ({
            label: sanitizeHtml(l.label || ""),
            url: sanitizeHtml(l.url || ""),
            type: l.type || "quick", // 🔥 auto-fix
            isActive: l.isActive !== false,
            order: i + 1,
          }))
        : [],
    };

    const footer = await Footer.findOneAndUpdate(
      { adminId },
      updatedData,
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (err) {
    console.error("FOOTER UPDATE ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};




