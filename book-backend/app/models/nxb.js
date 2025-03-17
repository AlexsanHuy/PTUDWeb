const mongoose = require("mongoose");

const nxbSchema = new mongoose.Schema({
  tenNXB: {
    type: String,
    required: true,
  },
  diaChi: {
    type: String,
    required: true,
  },
});

const NXB = mongoose.model("NXB", nxbSchema);

module.exports = NXB;
