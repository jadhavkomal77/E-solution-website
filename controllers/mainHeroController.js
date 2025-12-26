import MainHero from "../models/MainHero.js";

// ➕ Create / Update Hero
export const saveHero = async (req, res) => {
  try {
    const { title, subtitle, buttonText, imageUrl } = req.body;

    let hero = await MainHero.findOne();

    if (hero) {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.buttonText = buttonText;
      hero.imageUrl = imageUrl;
      await hero.save();
    } else {
      hero = await MainHero.create({
        title,
        subtitle,
        buttonText,
        imageUrl,
      });
    }

    res.json({ message: "Hero updated successfully!", hero });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get Hero
export const getHero = async (req, res) => {
  try {
    const hero = await MainHero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
