const Joi = require("joi");

const createValidation = Joi.object({
  full_name: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .min(8),
  username: Joi.string().required().min(3),
});

const loginMailValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .min(8),
});

const loginUsernameValidation = Joi.object({
  password: Joi.string().required().min(8),
  username: Joi.string().required().min(3),
});

module.exports = {
  createValidation,
  loginMailValidation,
  loginUsernameValidation,
};
