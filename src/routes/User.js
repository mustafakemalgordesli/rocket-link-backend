const express = require("express");
const {
  create,
  login,
  updateViewsCounts,
  changeProfilePic,
  getUserByToken,
} = require("../controllers/Users");
const validationSchemas = require("../validations/Users");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const { upload } = require("../scripts/utils/multer");
const httpStatus = require("http-status");

const router = express.Router();

router
  .route("/register")
  .post(validate(validationSchemas.createValidation), create);

router
  .route("/login")
  .post(validate(validationSchemas.loginUsernameValidation), login);

router.route("/").get(authenticate, getUserByToken);

router
  .route("/profilepic")
  .post(authenticate, upload.single("profilepic"), changeProfilePic);

router.put(
  "/viewscount",
  validate(validationSchemas.viewsCountUpdateValidation),
  updateViewsCounts
);

module.exports = router;
