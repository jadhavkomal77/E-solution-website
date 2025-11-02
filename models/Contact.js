// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   service: { type: String, required: true },
//   message: { type: String, required: true },
// }, { timestamps: true });

// export default mongoose.model("Contact", contactSchema);


import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
