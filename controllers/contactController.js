

// import Contact from "../models/Contact.js";

// // ✅ Create new contact (with logged in user)
// export const createContact = async (req, res) => {
//   try {
//     const { name, email, phone, service, message } = req.body;

//     if (!name || !email || !phone || !service || !message) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newContact = await Contact.create({
//       user: req.user ? req.user.id : null, // 🔗 login केलेला user असेल तर
//       name,
//       email,
//       phone,
//       service,
//       message,
//     });

//     res.status(201).json({
//       message: "Your message was sent successfully! Our representative will be in touch soon.",
//       contact: newContact,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error saving contact", error: err.message });
//   }
// };

// // ✅ Get all contacts (Admin only)
// export const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find()
//       .populate("user", "name email") // 🔗 admin ला user ची माहिती दिसेल
//       .sort({ createdAt: -1 });

//     res.json({ message: "Contacts fetched successfully", result: contacts });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching contacts", error: err.message });
//   }
// };

// // ✅ Delete contact
// export const deleteContact = async (req, res) => {
//   try {
//     await Contact.findByIdAndDelete(req.params.id);
//     res.json({ message: "Contact deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting contact", error: err.message });
//   }
// };






import axios from "axios";
import Contact from "../models/Contact.js";

// // ✅ Create new contact (with logged in user + WhatsApp Thank You Message)
// export const createContact = async (req, res) => {
//   try {
//     const { name, email, phone, service, message } = req.body;

//     if (!name || !email || !phone || !service || !message) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Save contact in DB
//     const newContact = await Contact.create({
//       user: req.user ? req.user.id : null, // 🔗 login केलेला user असेल तर
//       name,
//       email,
//       phone,
//       service,
//       message,
//     });

//     // ✅ WhatsApp Thank You Message
//     const whatsappToken = process.env.WHATSAPP_TOKEN;
//     const phoneNumberId = process.env.WHATSAPP_PHONE_ID;

//     // ✅ तयार करायचा मेसेज
//     const textMsg = `Hello ${name}! 👋
// Thank you for contacting our company regarding *${service}*.
// We appreciate your interest and will get back to you shortly.`;

//     // ✅ WhatsApp API कॉल
//     await axios.post(
//       `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
//       {
//         messaging_product: "whatsapp",
//         to: `91${phone}`, 
//         type: "text",
//         text: { body: textMsg },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${whatsappToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // ✅ Success response
//     res.status(201).json({
//       message:
//         "Your message was sent successfully! WhatsApp thank-you message sent.",
//       contact: newContact,
//     });
//   } catch (err) {
//     console.error("Error sending WhatsApp message:", err.message);
//     res
//       .status(500)
//       .json({ message: "Error saving contact", error: err.message });
//   }
// };
export const createContact = async (req, res) => {
  try {
    console.log("📩 Received Contact Data:", req.body);
    console.log("👤 Logged in user:", req.user);

    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = await Contact.create({
      user: req.user ? req.user.id : null,
      name,
      email,
      phone,
      service,
      message,
    });

    res.status(201).json({
      message: "Your message was sent successfully! Our representative will be in touch soon.",
      contact: newContact,
    });
  } catch (err) {
    console.error("❌ Error in createContact:", err);
    res.status(500).json({ message: "Error saving contact", error: err.message });
  }
};

// ✅ Get all contacts (Admin only)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("user", "name email") // 🔗 admin ला user ची माहिती दिसेल
      .sort({ createdAt: -1 });

    res.json({ message: "Contacts fetched successfully", result: contacts });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching contacts", error: err.message });
  }
};

// ✅ Delete contact
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: err.message });
  }
};
