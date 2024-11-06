const CryptoJS = require("crypto-js");

// Decrypt user input text
const decryptData = (encrptedData) => {
  console.log("encrypted data ", encrptedData);
  try {
    const bytes = CryptoJS.AES.decrypt(encrptedData, process.env.SECRETE_KEY);
    // const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const data = bytes.toString(CryptoJS.enc.Utf8);

    console.log("Descypted data:", data);
    return data;
    //return bytes;
  } catch (error) {
    console.log("error while decrypting....");
    throw new Error("Error in Decrypting QR Code");
    //return null;
  }
};

module.exports = decryptData;
