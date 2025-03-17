const express = require("express");
const router = express.Router();
const muonSachController = require("../controllers/muonsach.controller");

router.post("/muon/:did/:sid", muonSachController.createMuonSach);
router.get("/muon", muonSachController.getAllMuonSach);
router.get("/muon/:did", muonSachController.getMuonSachByDocGia);
router.put("/muon/:id", muonSachController.updateMuonSach);
router.delete("/muon/:id", muonSachController.deleteMuonSach);

module.exports = router;
