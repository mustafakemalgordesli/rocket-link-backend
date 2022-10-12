const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { decryptText } = require("../scripts/utils/helper");

module.exports = (req, res, next) => {
  try {
    const encryptedToken = req.headers.authorization.split(" ")[1];
    // console.log(encryptedToken);
    const token = decryptText(encryptedToken);
    // console.log(token);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.user = decoded._doc;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Auth failed",
      success: false,
    });
  }
};
