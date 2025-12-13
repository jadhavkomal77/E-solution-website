
import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Contact from "../models/Contact.js";
import Enquiry from "../models/Enquiry.js";
import Feedback from "../models/Feedback.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Upload from "../utils/upload.js";
import cloudinary from "../utils/cloudinary.config.js";

const JWT_SECRET = process.env.JWT_KEY || "defaultsecret";


// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin Not Found" });

//     if (!admin.isActive)
//       return res.status(403).json({ message: "Account Deactivated" });

//     const match = await bcrypt.compare(password, admin.password);
//     if (!match) return res.status(401).json({ message: "Wrong Password" });

//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("adminToken", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false
//     });

//     // ⭐ MOST IMPORTANT PART
//     res.json({
//       success: true,
//       message: "Login Successful",
//       token,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         phone: admin.phone,
//         role: admin.role
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });

    if (!admin.isActive)
      return res.status(403).json({ message: "Account Deactivated" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Wrong Password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// logout admin
export const adminLogout = (req, res) => {
  res.clearCookie("adminToken");
  res.json({ success: true, message: "Logout Successful" });
};

// get profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE PROFILE 
export const updateAdminProfile = async (req, res) => {
  try {
    Upload(req, res, async (err) => {
      if (err) return res.status(400).json({ message: "Upload Error" });

      const { name, email, phone } = req.body;
      let data = { name, email, phone };

      if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        data.profile = upload.secure_url;
      }

      const updated = await Admin.findByIdAndUpdate(req.user.id, data, { new: true })
        .select("-password");

      res.json({ success: true, message: "Profile Updated", admin: updated });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  CHANGE PASSWORD

export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });

    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match) return res.status(401).json({ message: "Old Password Incorrect" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GET MY PRODUCTS

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ assignedTo: req.user.id });

    res.json({ success: true, total: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE MY PRODUCT

export const updateMyProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    if (product.assignedTo.toString() !== req.user.id)
      return res.status(403).json({ message: "Access Denied" });

    let data = req.body;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      data.image = upload.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json({ success: true, message: "Product Updated", product: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  DELETE MY PRODUCT

export const deleteMyProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    if (product.assignedTo.toString() !== req.user.id)
      return res.status(403).json({ message: "Access Denied" });

    await product.deleteOne();
    res.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  ADMIN DASHBOARD STATS 

export const getAdminStats = async (req, res) => {
  try {
    const adminId = req.user.id;

    const stats = {
      products: await Product.countDocuments({ assignedTo: adminId }),
      services: await Service.countDocuments({ assignedTo: adminId }),
      contacts: await Contact.countDocuments({ adminId }),
      enquiries: await Enquiry.countDocuments({ adminId }),
      feedbacks: await Feedback.countDocuments({ adminId }),
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
