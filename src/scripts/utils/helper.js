var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const passwordToHash = (password) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.log(err);
      return undefined;
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        console.log(err);
        return undefined;
      }
      console.log(hash);
      return hash;
    });
  });
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
