import Product from "../models/Product.js";
import Upload from "../utils/upload.js";
import cloudinary from "../utils/cloudinary.config.js";


export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, features } = req.body;
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    let image = "";
    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      image = secure_url;
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      features: features ? features.split(",") : [],
      image,
      createdBy: req.user.userId,
    });

    res.json({ message: "Product added successfully", result: newProduct });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// 🧾 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ message: "Products fetched successfully", result: products });
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let imageUrl = product.image;
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadRes.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        features: req.body.features
          ? req.body.features.split(",").map((f) => f.trim())
          : product.features,
        image: imageUrl,
      },
      { new: true }
    );

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error });
  }
};



// ❌ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};
