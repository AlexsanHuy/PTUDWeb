const mongoose = require("mongoose");

const muonSachSchema = new mongoose.Schema({
  maDocGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocGia",
    required: true,
  },
  maSach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sach",
    required: true,
  },
  ngayMuon: {
    type: Date,
    default: Date.now(),
  },
  ngayTra: {
    type: Date,
    required: true,
  },
  trangThai: {
    type: String,
    required: true,
  },
});

const MuonSach = mongoose.model("MuonSach", muonSachSchema);

module.exports = MuonSach;
