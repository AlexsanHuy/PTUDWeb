const mongoose = require("mongoose");

const docGiaSchema = new mongoose.Schema({
  hoLot: {
    type: String,
    required: true,
  },
  ten: {
    type: String,
    required: true,
  },
  ngaySinh: {
    type: Date,
    default: Date.now(),
  },
  gioiTinh: {
    type: String,
    required: true,
  },
  diaChi: {
    type: String,
    required: true,
  },
  sdt: {
    type: String,
    required: true,
  },
  matKhau: {
    type: String,
    required: true,
  },
});

const DocGia = mongoose.model("DocGia", docGiaSchema);

module.exports = DocGia;
