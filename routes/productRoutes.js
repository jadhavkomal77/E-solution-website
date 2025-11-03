import express from "express";

import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAuth } from "../middleware/isAuth.js";
import Upload from "../utils/upload.js";

const router = express.Router();

router.post("/add", isAuth, Upload, addProduct);
router.get("/all", getProducts);
router.get("/single/:id", getProductById);
router.put("/update/:id", isAuth, Upload, updateProduct);
router.delete("/delete/:id", isAuth, deleteProduct);

export default router;
