const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(3),
  link: Joi.string().required().min(3),
});

const updateValidation = Joi.object({
  title: Joi.string().min(3),
  link: Joi.string().min(3),
});

module.exports = {
  createValidation,
  updateValidation,
};
