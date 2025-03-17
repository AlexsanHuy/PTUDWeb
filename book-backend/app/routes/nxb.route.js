const express = require("express");
const router = express.Router();
const nxbController = require("../controllers/nxb.controller");

router.post("/add", nxbController.createNXB);
router.get("/list", nxbController.getAllNXB);
router.get("/account/:id", nxbController.getNXBById);
router.put("/account/:id", nxbController.updateNXB);
router.delete("/account/:id", nxbController.deleteNXB);

module.exports = router;
