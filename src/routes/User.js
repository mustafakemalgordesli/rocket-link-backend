const express = require("express");
const {
  create,
  login,
  index,
  changeProfilePic,
} = require("../controllers/Users");
const validationSchemas = require("../validations/Users");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const { upload } = require("../scripts/utils/multer");

const router = express.Router();

router
  .route("/register")
  .post(validate(validationSchemas.createValidation), create);

router.route("/login").post((req, res, next) => {
  if (req.body.email) validate(validationSchemas.loginMailValidation);
  else validate(validationSchemas.loginUsernameValidation);
  login(req, res, next);
});

router.route("/").get(authenticate, index);

router
  .route("/profilepic")
  .post(authenticate, upload.single("profilepic"), changeProfilePic);

module.exports = router;
