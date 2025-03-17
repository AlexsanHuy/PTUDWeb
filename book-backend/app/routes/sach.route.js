const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sach.controller");

router.post("/add", sachController.createSach);
router.get("/list", sachController.getAllSach);
router.get("/:id", sachController.getSachById);
router.put("/:id", sachController.updateSach);
router.delete("/:id", sachController.deleteSach);

module.exports = router;