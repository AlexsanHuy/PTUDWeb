const MuonSach = require("../models/muonsach");
const mongoose = require("mongoose");

exports.createMuonSach = async (req, res) => {
  try {
    const {maDocGia, maSach, ngayTra, trangThai } = req.body;

    if (!maDocGia || !maSach || !ngayTra || !trangThai) {
      return res.status(400).json({ message: "Thiếu thông tin mượn sách" });
    }

    const newMuonSach = await MuonSach.create({
      maDocGia,
      maSach,
      ngayMuon: new Date(),
      ngayTra,
      trangThai,
    });

    res.status(201).json(newMuonSach);
  } catch (error) {
    console.error("Lỗi khi tạo mượn sách:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


exports.getAllMuonSach = async (req, res) => {
  try {
    const muonSach = await MuonSach.find()
      .populate("maDocGia", "hoLot ten")
      .populate("maSach", "tenSach");

    res.status(200).json(muonSach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMuonSachByDocGia = async (req, res) => {
  try {
    const muonSach = await MuonSach.find({ maDocGia: req.params.did })
      .populate("maSach", "tenSach")
      .populate("maDocGia", "hoLot ten");   

    res.status(200).json(muonSach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMuonSach = async (req, res) => {
  const { ngayTra, trangThai } = req.body;
  try {
    const muonSach = await MuonSach.findByIdAndUpdate(req.params.id, { ngayTra, trangThai }, { new: true });
    res.status(200).json(muonSach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMuonSach = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid muon sach id" });
  }
  const muonSach = await MuonSach.findByIdAndDelete(req.params.id);
  if (!muonSach) {
    return res.status(404).json({ message: "Muon sach not found" });
  }
  res.status(200).json({ message: "Muon sach deleted successfully" });
};



