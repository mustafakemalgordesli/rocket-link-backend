const express = require("express");
const {
  create,
  getAllByUserId,
  getAllByUsername,
  update,
  remove,
} = require("../controllers/Links");
const validationSchemas = require("../validations/Links");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router
  .route("/")
  .post(authenticate, validate(validationSchemas.createValidation), create);

// router.route("/").get(authenticate, index);

router.route("/:username").get(getAllByUsername);

router.route("/").get(authenticate, getAllByUserId);

// router.route("/:id").get(getById);

router
  .route("/:id")
  .put(authenticate, validate(validationSchemas.updateValidation), update);

router.route("/:id").delete(authenticate, remove);

module.exports = router;
