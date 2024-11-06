const CryptoJS = require("crypto-js");
const moment = require("moment");

const QrcodeGenerator = (patient) => {
  try {
    const SECRET_PASS = process.env.SECRETE_KEY;

    const payload =
      patient.id +
      patient.name +
      patient.mobile +
      patient.address +
      moment(patient.admissiondate).format("LLLL");
    // const payload = {
    //   id: patient.id,
    //   name: patient.name,
    //   mobile: patient.mobile,
    //   address: patient.address,
    //   date: moment(patient.admissiondate).format("LLLL"),
    // };

    console.log("pay load before encryption", payload);

    //console.log("Patient Data IN Generator:", patient);
    console.log("secrete key", SECRET_PASS);

    const data = CryptoJS.AES.encrypt(payload, SECRET_PASS).toString();
    // const data = CryptoJS.AES.encrypt(
    //   JSON.stringify(patient),
    //   SECRET_PASS
    // ).toString();

    console.log("Data after encryption:", data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = QrcodeGenerator;
