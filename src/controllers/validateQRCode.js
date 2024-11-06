const decryptData = require("../Utils/DecryptQRCode");
const patientModel = require("../models/patient");
const CryptoJS = require("crypto-js");

const SECRET_PASS = process.env.SECRETE_KEY;
//Expects data:in request body as { data:""}
const validateQRCodeController = async (req, res) => {
  try {
    const { data } = req.body;

    console.log("qr code to validate is ", data);

    const validatedData = decryptData(data);

    //const patient = await patientModel.findOne({ id: validatedData?.id });

    if (validatedData) {
      console.log("code after decript is ", validatedData.toString());

      // check with db encrypted data
      if (validatedData) {
        // const data = CryptoJS.AES.encrypt(
        //   validatedData,
        //   SECRET_PASS
        // ).toString();
        const flag = await patientModel.findOne({ qrCode: validatedData });
        if (flag) {
          console.log("Code is valid and the patient is ", flag);
          if (flag.qrCode.length === validatedData.length) {
            console.log("1111", validatedData + "----" + flag.qrCode);
          } else {
            console.log("0000");
          }
        } else {
          console.log("Invalid Code");
          res.status(400).json({
            data: {},
            success: false,
            error: true,
            message: "QR Code Not available",
          });
        }

        res.status(200).json({
          data: 1,
          success: true,
          error: false,
          message: "Valid QRCode.",
        });
      }
    } else {
      res.status(400).json({
        data: {},
        success: false,
        error: true,
        message: "QR Code Not available",
      });
    }
    // if (patient) {
    //   // if (JSON.stringify(patient) !== JSON.stringify(validatedData)) {
    //   //   res.status(400).json({
    //   //     message: "Invalid QR Code",
    //   //     data: 0,
    //   //     error: true,
    //   //     success: false,
    //   //   });
    //   // }

    //   const keys1 = Object.keys(JSON.parse(patient));
    //   const keys2 = Object.keys(validatedData);

    //   for (const key of keys1) {
    //     if (JSON.parse(patient)[key] !== JSON.parse(validatedData)[key]) {
    //       res.status(400).json({
    //         message: "Invalid QR Code11111",
    //         data: 0,
    //         error: true,
    //         success: false,
    //       });
    //     }
    //   }

    //   if (
    //     validatedData.name === patient.name &&
    //     validatedData.address === patient.address &&
    //     validatedData.mobile === patient.mobile
    //   ) {
    //     res.status(200).json({
    //       data: 1,
    //       success: true,
    //       error: false,
    //       message: "Valid QRCode.",
    //     });
    //   } else {
    //     res.status(400).json({
    //       message: "Invalid QR Code",
    //       data: 0,
    //       error: true,
    //       success: false,
    //     });
    //   }
    // } else {
    //   res.status(400).json({
    //     message: "Invalid QR Code",
    //     data: 0,
    //     error: true,
    //     success: false,
    //   });
    // }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

const validate = async (data) => {
  const patient = await patientModel.findOne({ id: data?.id });
  if (!patient) return false;
  return true;
};

module.exports = validateQRCodeController;
