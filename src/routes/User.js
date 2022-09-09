const express = require("express");
const { create, login } = require("../controllers/Users");
const validationSchemas = require("../validations/Users");
const validate = require("../middlewares/validate");

const router = express.Router();

router
  .route("/register")
  .post(validate(validationSchemas.createValidation), create);

router.route("/login").post((req, res) => {
  if (req.body.email) validate(validationSchemas.loginMailValidation);
  else validate(validationSchemas.loginUsernameValidation);
  next();
});

module.exports = router;
