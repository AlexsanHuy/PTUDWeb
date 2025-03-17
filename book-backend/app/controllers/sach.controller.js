const mongoose = require("mongoose");
const Sach = require("../models/sach");

exports.createSach = async (req, res) => {
  const { tenSach, donGia, soLuong, namXuatBan, maNXB } = req.body;
  const existingSach = await Sach.findOne({ tenSach });
  if (existingSach) {
    return res.status(400).json({ message: "Sach already exists" });
  }
  try {
    const newSach = await Sach.create({ tenSach, donGia, soLuong, namXuatBan, maNXB }); 
    res.status(201).json(newSach);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllSach = async (req, res) => {
  try {
    const sach = await Sach.find();
    res.status(200).json(sach);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getSachById = async (req, res) => {
  try {
    const sach = await Sach.findById(req.params.id);
    if (!sach) {
      return res.status(404).json({ message: "Sach not found" });
    }
    res.status(200).json(sach);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateSach = async (req, res) => {
  try {
    const sach = await Sach.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sach) {
      return res.status(404).json({ message: "Sach not found" });
    }
    res.status(200).json({message:
        "Sach updated successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteSach = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid sach id" });
  }
  try {
    const sach = await Sach.findByIdAndDelete(req.params.id);
    if (!sach) {
      return res.status(404).json({ message: "Sach not found" });
    }
    res.status(200).json({message:
        "Sach deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};