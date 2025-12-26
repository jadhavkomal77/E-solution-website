import mongoose from "mongoose";

const mainHeroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
      default: "Get Started",
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MainHero", mainHeroSchema);
