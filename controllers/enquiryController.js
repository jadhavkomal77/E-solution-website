// import Enquiry from "../models/Enquiry.js";

// // USER → create enquiry
// // export const createEnquiry = async (req, res) => {
// //   try {
// //     const { name, email, phone, subject, message, adminId } = req.body;

// //     if (!name || !email || !subject || !message || !adminId) {
// //       return res.status(400).json({ message: "Missing fields" });
// //     }

// //     const enquiry = await Enquiry.create({
// //       name,
// //       email,
// //       phone,
// //       subject,
// //       message,
// //       adminId,
// //       userId: req.user?.id || null,
// //     });

// //     res.status(201).json({ success: true, enquiry });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// export const createEnquiry = async (req, res) => {
//   try {
//     const { name, email, phone, subject, message, productId } = req.body;

//     if (!name || !email || !subject || !message || !productId) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     // 1️⃣ Product शोधा
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     // 2️⃣ Product मधून admin id घ्या
//     const adminId = product.adminId;

//     // 3️⃣ Enquiry तयार करा
//     const enquiry = await Enquiry.create({
//       name,
//       email,
//       phone,
//       subject,
//       message,
//       adminId,         // ⭐ AUTO ADMIN DETECTED
//       productId,
//       userId: req.user?.id || null,
//     });

//     res.status(201).json({ success: true, enquiry });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // ADMIN → get only his enquiries
// export const getAllEnquiries = async (req, res) => {
//   try {
//     const enquiries = await Enquiry.find({ adminId: req.user.id }).sort({
//       createdAt: -1,
//     });

//     res.json({ success: true, enquiries });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // USER → get own enquiries
// export const getMyEnquiries = async (req, res) => {
//   try {
//     const enquiries = await Enquiry.find({ userId: req.user.id });
//     res.json({ success: true, enquiries });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ADMIN → update enquiry status
// export const updateEnquiryStatus = async (req, res) => {
//   try {
//     const enquiry = await Enquiry.findById(req.params.id);

//     if (!enquiry)
//       return res.status(404).json({ message: "Enquiry not found" });

//     if (enquiry.adminId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Access Denied" });

//     enquiry.status = req.body.status;
//     await enquiry.save();

//     res.json({ success: true, enquiry });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ADMIN → delete enquiry
// export const deleteEnquiry = async (req, res) => {
//   try {
//     const enquiry = await Enquiry.findById(req.params.id);

//     if (!enquiry)
//       return res.status(404).json({ message: "Not found" });

//     if (enquiry.adminId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Not allowed" });

//     await enquiry.deleteOne();

//     res.json({ success: true, message: "Enquiry Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


import Enquiry from "../models/Enquiry.js";
import Product from "../models/Product.js";

// USER CREATES ENQUIRY
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message, productId } = req.body;

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      adminId: product.assignedTo,   // ⭐ auto-detected admin
      userId: req.user?.id || null,
    });

    res.status(201).json({ success: true, enquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN - Get enquiries meant for him
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ adminId: req.user.id });
    res.json({ success: true, enquiries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER - My enquiries
export const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ userId: req.user.id });
    res.json({ success: true, enquiries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN - Update enquiry status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const q = await Enquiry.findById(req.params.id);

    if (!q) return res.status(404).json({ message: "Not found" });

    if (q.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    q.status = req.body.status;
    await q.save();

    res.json({ success: true, enquiry: q });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ENQUIRY
export const deleteEnquiry = async (req, res) => {
  try {
    const q = await Enquiry.findById(req.params.id);

    if (!q) return res.status(404).json({ message: "Not found" });

    if (q.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await q.deleteOne();

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
