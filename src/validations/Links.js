const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(3),
  link: Joi.string().required().min(3),
  user_id: Joi.string().required(),
});

module.exports = {
  createValidation,
};
