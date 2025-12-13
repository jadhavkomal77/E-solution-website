import About from "../models/About.js";

// GET ABOUT
export const getAbout = async (req, res) => {
  try {
    let data = await About.findOne();

    if (!data) {
      data = await About.create({
        mainTitle: "About Us",
        mainDescription: "Add your content from admin panel",

        features: [
          { icon: "Shield", title: "", description: "" },
          { icon: "Award", title: "", description: "" },
          { icon: "Users", title: "", description: "" },
          { icon: "Zap", title: "", description: "" }
        ],

        whyChoose: [
          { icon: "Check", title: "", description: "" }
        ],

        stats: {
          year: "",
          projects: "",
          satisfaction: "",
          coverage: ""
        }
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// UPDATE ABOUT
export const updateAbout = async (req, res) => {
  try {
    const body = req.body;

    // ensure arrays
    body.features = (body.features || []).map(f => ({
      icon: f.icon || "",
      title: f.title || "",
      description: f.description || ""
    }));

    body.whyChoose = (body.whyChoose || []).map(w => ({
      icon: w.icon || "",
      title: w.title || "",
      description: w.description || ""
    }));

    body.stats = body.stats || {
      year: "",
      projects: "",
      satisfaction: "",
      coverage: ""
    };

    const updated = await About.findOneAndUpdate({}, body, {
      new: true,
      upsert: true
    });

    res.json({
      message: "Updated Successfully ✅",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: "Update Failed", error });
  }
};
