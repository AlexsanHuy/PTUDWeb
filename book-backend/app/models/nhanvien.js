const mongoose = require("mongoose");

const nhanVienSchema = new mongoose.Schema({
  hoTen: {
    type: String,
    required: true,
  },
  matKhau: {
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
    chucVu: {
    type: String,
    required: true,
  },
});

const NhanVien = mongoose.model("NhanVien", nhanVienSchema);

module.exports = NhanVien;
