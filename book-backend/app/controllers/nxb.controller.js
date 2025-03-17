const NXB = require("../models/nxb");
const mongoose = require("mongoose");

exports.createNXB = async (req, res) => {
  const { tenNXB, diaChi} = req.body;
  const existingNXB = await NXB.findOne({ tenNXB });
  if (existingNXB) {
    return res.status(400).json({ message: "NXB already exists" });
  }
  try {
    const newNXB = await NXB.create({ tenNXB, diaChi });
    res.status(201).json(newNXB);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllNXB = async (req, res) => {
  try {
    const nxb = await NXB.find();
    res.status(200).json(nxb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getNXBById = async (req, res) => {
  try {
    const nxb = await NXB.findById(req.params.id);
    res.status(200).json(nxb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateNXB = async (req, res) => {
  try {
    const nxb = await NXB.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nxb) {
      return res.status(404).json({ message: "NXB not found" });
    }
    res.status(200).json({message:
        "NXB updated successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteNXB = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid NXB id" });
  }
  try {
    const nxb = await NXB.findByIdAndDelete(req.params.id);
    if (!nxb) {
      return res.status(404).json({ message: "NXB not found" }); 
    }
    res.status(200).json({message:
        "NXB deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
