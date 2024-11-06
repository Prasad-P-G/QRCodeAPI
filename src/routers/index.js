const express = require("express");
const newPatientController = require("../controllers/newPatient");
const qrCodeGenratorController = require("../controllers/generateQRCodeData");
const validateQRCodeController = require("../controllers/validateQRCode");

const router = express.Router();

router.post("/patient", newPatientController);
router.get("/qrCode", qrCodeGenratorController);
router.post("/validateqrCode", validateQRCodeController);
module.exports = router;
