// import mongoose from "mongoose";

// const superAdminSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String },
//     password: { type: String, required: true },
//     role: { type: String, default: "superadmin" },
//     isActive: { type: Boolean, default: true },
//   },
//  {
//     timestamps: true,
//   }
// );

// const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
// export default SuperAdmin;




import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: "superadmin" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("SuperAdmin", superAdminSchema);
