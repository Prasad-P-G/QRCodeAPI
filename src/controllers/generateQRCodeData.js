const patientModel = require("../models/patient");
const QrcodeGenerator = require("../Utils/QRCodeGenerator");
const moment = require("moment");

const qrCodeGenratorController = async (req, res) => {
  try {
    console.log("patient Data :", req.body);
    const { id } = req.body;
    console.log("Patient Id :", id);

    //check whether user exits in DB
    const patient = await patientModel.findOne({ id });
    if (!patient) {
      throw new Error("patient Does not available!");
    }

    const qrCodeDate = QrcodeGenerator(patient);

    const dataToValidate =
      patient.id +
      patient.name +
      patient.mobile +
      patient.address +
      moment(patient.admissiondate).format("LLLL");

    if (qrCodeDate) {
      const responseData = await patientModel.findOneAndUpdate(
        { id: id },
        { qrCode: dataToValidate },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      //await responseData.save();
      console.log("response fter updte,", responseData);
    }

    res.status(200).json({
      data: qrCodeDate,
      success: true,
      error: false,
      message: "QR Code Generated!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = qrCodeGenratorController;
