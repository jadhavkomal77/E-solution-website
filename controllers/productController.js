import Product from "../models/Product.js";
import Admin from "../models/Admin.js";
import cloudinary from "../utils/cloudinary.config.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, features } = req.body;

    let image = "";
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      image = upload.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      features: features ? features.split(",") : [],
      image,
      assignedTo: req.user.id,
      adminId: req.user.id,   // ⭐ REQUIRED FOR ENQUIRY
      createdBy: req.user.id,
    });

    res.json({ success: true, result: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN PRODUCTS ONLY
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ assignedTo: req.user.id });
    res.json({ success: true, result: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🌍 PUBLIC → Products by WEBSITE SLUG
export const getPublicProductsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1️⃣ Find admin by websiteSlug
    const admin = await Admin.findOne({
      websiteSlug: slug,
      isActive: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    // 2️⃣ Fetch ONLY this admin products
    const products = await Product.find({
      adminId: admin._id,
    }).select("-assignedTo -createdBy");

    res.json({ success: true, result: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🌍 PUBLIC → Single product (SAFE)
export const getSingleProductPublic = async (req, res) => {
  try {
    const { slug, id } = req.params;

    const admin = await Admin.findOne({
      websiteSlug: slug,
      isActive: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const product = await Product.findOne({
      _id: id,
      adminId: admin._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);

    if (!p) return res.status(404).json({ message: "Product not found" });

    if (p.assignedTo.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      p.image = upload.secure_url;
    }

    p.name = req.body.name || p.name;
    p.description = req.body.description || p.description;
    p.price = req.body.price || p.price;
    p.category = req.body.category || p.category;
    p.features = req.body.features ? req.body.features.split(",") : p.features;

    await p.save();

    res.json({ success: true, result: p });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);

    if (!p) return res.status(404).json({ message: "Product not found" });

    if (p.assignedTo.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    await p.deleteOne();

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
