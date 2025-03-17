const DocGia = require("../models/docgia");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456789";

exports.loginDocGia = async (req, res) => {
  const { sdt, matKhau } = req.body;

  const docGia = await DocGia.findOne({ sdt });
  if (!docGia || docGia.matKhau !== matKhau) {
    return res.status(401).json({ message: "Số điện thoại hoặc mật khẩu không đúng!" });
  }

  const token = jwt.sign(
    { userId: docGia._id, hoLot: docGia.hoLot, ten: docGia.ten }, 
    SECRET_KEY,
    { expiresIn: "2h" }
  );

  res.status(200).json({
    message: "Login successfully",
    token: token,
    userId: docGia._id,
    userName: `${docGia.hoLot} ${docGia.ten}`
  });
};


exports.createDocGia = async (req, res) => {
  const {hoLot, ten, ngaySinh, gioiTinh, diaChi, sdt, matKhau } = req.body;
  const existingDocGia = await DocGia.findOne({ sdt });
  if (existingDocGia) {
    return res.status(400).json({ message: "Doc gia already exists" });
  }
  try {
    const newDocGia = await DocGia.create({ hoLot, ten, ngaySinh, gioiTinh, diaChi, sdt, matKhau });
    res.status(201).json(newDocGia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllDocGia = async (req, res) => {
  try {
    const docGia = await DocGia.find();
    res.status(200).json(docGia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getDocGiaById = async (req, res) => {
  try {
    const docGia = await DocGia.findById(req.params.id);
    res.status(200).json(docGia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateDocGiaById = async (req, res) => {
  try {
    const docGia = await DocGia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!docGia) {
      return res.status(404).json({ message: "Doc gia not found" });
    }
    res.status(200).json({message:
        "Doc gia updated successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteDocGiaById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Doc gia id" });
  }
  try {
    const docGia = await DocGia.findByIdAndDelete(req.params.id);
    if (!docGia) {
      return res.status(404).json({ message: "Doc gia not found" });
    }
    res.status(200).json({message:
        "Doc gia deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


