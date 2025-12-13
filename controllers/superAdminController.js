import SuperAdmin from "../models/SuperAdmin.js";
import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Upload from "../utils/upload.js";
import cloudinary from "../utils/cloudinary.config.js";
import { logActivity } from "../utils/logActivity.js";

const JWT_SECRET = process.env.JWT_KEY || "defaultsecret";


export const superAdminRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await SuperAdmin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "SuperAdmin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const superAdmin = await SuperAdmin.create({
      name,
      email,
      password: hashed,
      phone,
    });

    res.json({ success: true, message: "SuperAdmin Registered", superAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin)
      return res.status(404).json({ message: "SuperAdmin Not Found" });

    const check = await bcrypt.compare(password, superAdmin.password);
    if (!check) return res.status(401).json({ message: "Wrong Password" });

    const token = jwt.sign(
      { id: superAdmin._id, role: "superadmin" },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("superToken", token, {
      httpOnly: true,
      sameSite: "strict",
    });

  await logActivity(
  superAdmin._id,
  "superadmin",
  "SuperAdmin Login",
  `${superAdmin.name} logged in`,
  req.ip
);
    res.json({
      success: true,
      message: "Login Successful",
      token,
      superadmin: {
        id: superAdmin._id,
        name: superAdmin.name,
        email: superAdmin.email,
        phone: superAdmin.phone,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const superAdminLogout = (req, res) => {
  res.clearCookie("superToken");
  res.json({ success: true, message: "Logged Out" });
};

export const getSuperAdminProfile = async (req, res) => {
  try {
    const profile = await SuperAdmin.findById(req.user.id).select("-password");
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSuperAdminProfile = async (req, res) => {
  try {
    Upload(req, res, async (err) => {
      if (err) return res.status(400).json({ message: "Upload Error", err });

      const { name, email, phone } = req.body;
      let data = { name, email, phone };

      if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        data.profile = upload.secure_url;
      }

      const updated = await SuperAdmin.findByIdAndUpdate(req.user.id, data, {
        new: true,
      }).select("-password");

      await logActivity(
        req.user.id,
        "Update Profile",
        `SuperAdmin updated profile`,
        req.ip
      );

      res.json({
        success: true,
        message: "Profile Updated",
        superAdmin: updated,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashed,
      phone,
      role: "admin",
      isActive: true,
      assignedProducts: [],
      assignedWebsite: null,
    });

   await logActivity(
  req.user.id,
  req.user.role,
  "Create Admin",
  `Created new admin: ${admin.name}`,
  req.ip
);


    res.json({ success: true, message: "Admin Created", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    let data = { name, email, phone };
    if (password) data.password = await bcrypt.hash(password, 10);

    const admin = await Admin.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

  await logActivity(
  req.user.id,
  req.user.role,
  "Update Admin",
  `Updated admin: ${admin.name}`,
  req.ip
);
    res.json({ success: true, message: "Admin Updated", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });

    await admin.deleteOne();
   await logActivity(
  req.user.id,
  req.user.role,
  "Delete Admin",
  `Deleted admin: ${admin.name}`,
  req.ip
);


    res.json({ success: true, message: "Admin Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const toggleAdminStatus = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin)
      return res.status(404).json({ message: "Admin Not Found" });

    admin.isActive = !admin.isActive;
    await admin.save();

   await logActivity(
  req.user.id,
  req.user.role,
  "Toggle Admin Status",
  `${admin.name} is now ${admin.isActive ? "Active" : "Inactive"}`,
  req.ip
);

    res.json({
      success: true,
      message: admin.isActive ? "Admin Activated" : "Admin Deactivated",
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const assignProducts = async (req, res) => {
  try {
    const { adminId, productIds } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    admin.assignedProducts = productIds;
    await admin.save();

    await Product.updateMany(
      { _id: { $in: productIds } },
      { assignedTo: adminId }
    );
   await logActivity(
  req.user.id,
  req.user.role,
  "Assign Products",
  `Assigned ${productIds.length} products to admin: ${admin.name}`,
  req.ip
);


    res.json({
      success: true,
      message: "Products assigned successfully",
      assigned: admin.assignedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
