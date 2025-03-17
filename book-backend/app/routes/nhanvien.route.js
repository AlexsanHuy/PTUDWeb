const express = require("express");
const router = express.Router();
const nhanVienController = require("../controllers/nhanvien.controller");

router.post("/register", nhanVienController.createNhanVien);
router.post("/login", nhanVienController.loginNhanVien);
router.get("/account", nhanVienController.getAllNhanVien);
router.get("/account/:id", nhanVienController.getNhanVienById);
router.put("/account/:id", nhanVienController.updateNhanVienById);
router.delete("/account/:id", nhanVienController.deleteNhanVienById);

module.exports = router;
