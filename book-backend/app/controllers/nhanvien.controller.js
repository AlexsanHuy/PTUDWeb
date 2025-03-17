const NhanVien = require("../models/nhanvien");
const ApiError = require("../middleware/api-error");
const mongoose = require("mongoose");

exports.loginNhanVien = async (req, res) => {
  const { sdt, matKhau } = req.body;
  const nhanVien = await NhanVien.findOne({ sdt, matKhau });
  if (!nhanVien) {
    return res.status(401).json({ message: "Invalid sdt or password" });
  }
  res.status(200).json({message:
      "Login successfully"
  });
};

exports.createNhanVien = async (req, res) => {
  const { hoTen, matKhau, diaChi, sdt, chucVu } = req.body;
  const existingNhanVien = await NhanVien.findOne({ sdt });
  if (existingNhanVien) {
    return res.status(400).json({ message: "Nhan vien already exists" });
  }
  try {
    const newNhanVien = await NhanVien.create({ hoTen, matKhau, diaChi, sdt, chucVu });
    res.status(201).json(newNhanVien);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllNhanVien = async (req, res) => {
  try {
    const nhanVien = await NhanVien.find();
    res.status(200).json(nhanVien);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getNhanVienById = async (req, res) => {
  try {
    const nhanVien = await NhanVien.findById(req.params.id);
    res.status(200).json(nhanVien);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateNhanVienById = async (req, res) => {
  try {
    const nhanVien = await NhanVien.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhan vien not found" });  
    }
    res.status(200).json({message:
        "Nhan vien updated successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteNhanVienById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Nhan vien id" });
  }

  try {
    const nhanVien = await NhanVien.findByIdAndDelete(req.params.id);
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhan vien not found" });
    }
    res.status(200).json({message:
        "Nhan vien deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


