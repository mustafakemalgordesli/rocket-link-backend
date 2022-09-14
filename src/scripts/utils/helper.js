var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const passwordToHash = (password) => {
  // password hashing
};

const generateAccessToken = (user) => {
  return JWT.sign(
    { name: user.email, ...user },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1w",
    }
  );
};

const generateRefreshToken = (user) => {
  return JWT.sign(
    { name: user.email, ...user },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};

const encryptText = (text) => {
  return AES.encrypt(text, process.env.ENCRYPT_KEY).toString();
};

const decryptText = (text) => {
  var bytes = AES.decrypt(text, process.env.ENCRYPT_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
  encryptText,
  decryptText,
};
