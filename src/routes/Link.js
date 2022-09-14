const express = require("express");
const {
  create,
  getById,
  getAllByUserId,
  update,
  remove,
} = require("../controllers/Links");
const validationSchemas = require("../validations/Links");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.route("/").post(validate(validationSchemas.createValidation), create);

// router.route("/").get(authenticate, index);

router.route("/").get(authenticate, getAllByUserId);

router.route("/:id").get(getById);

router.route("/:id").put(update);

router.route("/:id").delete(remove);

module.exports = router;
