const patientModel = require("../models/patient");
const QrcodeGenerator = require("../Utils/QRCodeGenerator");
const moment = require("moment");
const qrCode = require("qrcode");

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

    const qrCodeData = QrcodeGenerator(patient);

    const dataToValidate =
      patient.id +
      patient.name +
      patient.mobile +
      patient.address +
      moment(patient.admissiondate).format("LLLL");

    if (qrCodeData) {
      const responseData = await patientModel.findOneAndUpdate(
        { id: id },
        { qrCode: dataToValidate },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      //await responseData.save();
      console.log("response fter updte,", responseData);

      //Call QR Code Image Generator
      const code = qrcodeImageGenerator(qrCodeData, patient.id);

      res.status(200).json({
        data: qrCodeData,
        success: true,
        error: false,
        message: "QR Code Generated!",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

const qrcodeImageGenerator = (qrCodeData, patientID) => {
  // type-1

  // qrCode.toString(qrCodeData, { type: "terminal" }, (err, code) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log(code);
  //   return code;
  // });

  //type-2 - generating base64 data url
  qrCode.toDataURL(JSON.stringify(qrCodeData), (err, code) => {
    if (err) return console.log(err);
    console.log(code);
    return code;
  });

  // type-3 - Generating png file
  // qrCode.toFile(patientID + ".png", JSON.stringify(qrCodeData), (err) => {
  //   if (err) return console.log(err);
  // });
};

module.exports = qrCodeGenratorController;
