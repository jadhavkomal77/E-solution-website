import multer from "multer";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const fileFilter = (req, file, cb) => {
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and WEBP are allowed"));
};

// ⭐ Memory Storage - Direct upload to Cloudinary (no local disk usage)
const memoryStorage = multer.memoryStorage();

// ⭐ Main Universal Upload Middleware - Uses memory storage
export const uploadSingle = (field) => multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}).single(field);

export const uploadMultiple = (fields) => multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields(fields);
