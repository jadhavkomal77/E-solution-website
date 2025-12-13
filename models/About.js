import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  mainTitle: String,
  mainDescription: String,

  features: [
    {
      icon: String,         // ⭐ Icon added here
      title: String,
      description: String
    }
  ],

  whyChoose: [
    {
      icon: String,         // ⭐ Icon added here (optional)
      title: String,
      description: String
    }
  ],

  stats: {
    year: Number,
    projects: String,
    satisfaction: String,
    coverage: String
  }
});

export default mongoose.model("About", aboutSchema);
