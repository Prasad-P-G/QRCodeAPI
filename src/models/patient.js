const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  id: {
    type: String,
    unique: true,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  address: String,
  admissiondate: Date,
  status: Number,
  qrCode: String,
});

const patientModel = mongoose.model("patient", patientSchema);

module.exports = patientModel;
