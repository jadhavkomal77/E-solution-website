import Service from "../models/Service.js";


export const addService = async (req, res) => {
  try {
    const newService = await Service.create({
      ...req.body,
      adminId: req.user.id, // ⭐ admin owns this service
    });

    res.json({ success: true, newService });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// export const getServices = async (req, res) => {
//   try {
//     const list = await Service.find({ adminId: req.user.id });
//     res.json(list);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ adminId: req.user.id });
    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({ success: true, service });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateService = async (req, res) => {
  try {
    const s = await Service.findById(req.params.id);

    if (!s) return res.status(404).json({ message: "Not found" });

    if (s.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    Object.assign(s, req.body);
    await s.save();

    res.json({ success: true, s });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const s = await Service.findById(req.params.id);

    if (!s) return res.status(404).json({ message: "Not found" });

    if (s.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await s.deleteOne();

    res.json({ success: true, message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
