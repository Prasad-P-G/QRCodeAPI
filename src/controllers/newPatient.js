const patientModel = require("../models/patient");
const moment = require("moment");

const newPatientController = async (req, res) => {
  try {
    //test - check request data
    console.log("request data :", req.body);
    const payLoad = {
      ...req.body,
      admissiondate: moment().format("LLLL"),
    };
    const patient = new patientModel(payLoad);
    const responseData = await patient.save();

    //test - check db data
    console.log(" response data :", responseData);

    res.status(201).json({
      data: responseData,
      success: true,
      error: false,
      message: "New patient recorded successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = newPatientController;
