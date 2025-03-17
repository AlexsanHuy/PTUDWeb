const express = require("express");
const router = express.Router();
const docGiaController = require("../controllers/docgia.controller");

router.post("/register", docGiaController.createDocGia);
router.post("/login", docGiaController.loginDocGia);
router.get("/account", docGiaController.getAllDocGia);
router.get("/account/:id", docGiaController.getDocGiaById);
router.put("/account/:id", docGiaController.updateDocGiaById);
router.delete("/account/:id", docGiaController.deleteDocGiaById);

module.exports = router;
