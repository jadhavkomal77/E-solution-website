import Contact from "../models/Contact.js";
import Admin from "../models/Admin.js";
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, service, message, slug } = req.body;

    console.log("BODY RECEIVED =", req.body);

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let adminId;

    // ⭐ CONDITION FIX — slug must be a valid string
    if (slug && typeof slug === "string" && slug.trim() !== "") {
      const admin = await Admin.findOne({ websiteSlug: slug.trim() });

      if (!admin) {
        return res.status(404).json({ message: "Invalid website slug" });
      }

      adminId = admin._id;
    } else {
      adminId = process.env.MAIN_ADMIN_ID;
    }

    if (!adminId) {
      return res.status(500).json({ message: "Admin ID missing (backend error)" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
      adminId,
      user: req.user?.id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully!",
      contact,
    });
  } catch (err) {
    console.error("CONTACT CREATE ERROR:", err);
    return res.status(500).json({ message: "Server error creating contact" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const adminId = req.user.id;

    const contacts = await Contact.find({ adminId }).sort({ createdAt: -1 });

    res.json({ success: true, contacts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const adminId = req.user.id;

    const contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ message: "Contact not found" });

    if (contact.adminId.toString() !== adminId)
      return res.status(403).json({ message: "Not allowed" });

    await contact.deleteOne();

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
