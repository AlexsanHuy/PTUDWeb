const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema({
  tenSach: {
    type: String,
    required: true,
  },
  donGia: {
    type: Number,
    required: true,
  },
  soLuong: {
    type: Number,
    required: true,
  },
  namXuatBan: {
    type: Number,
    required: true,
  },
  maNXB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NXB",
    required: true,
  },
});

const Sach = mongoose.model("Sach", sachSchema);

module.exports = Sach;
