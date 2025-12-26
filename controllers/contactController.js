import Contact from "../models/Contact.js";

/* ======================================================
   PUBLIC → CREATE CONTACT
====================================================== */
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ⭐ ALWAYS FROM MIDDLEWARE
    if (!req.adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
      adminId: req.adminId,
      user: req.user?.id || null,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   ADMIN → GET OWN CONTACTS
====================================================== */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      adminId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      contacts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   ADMIN → DELETE OWN CONTACT
====================================================== */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ message: "Contact not found" });

    if (contact.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await contact.deleteOne();

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
