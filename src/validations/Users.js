const Joi = require("joi");

const createValidation = Joi.object({
  firstName: Joi.string().required().min(3),
  lastName: Joi.string().min(3),
  password: Joi.string().required().min(8),
  // email: Joi.string()
  //   .email({ tlds: { allow: false } })
  //   .required()
  //   .min(8),
  username: Joi.string()
    .regex(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-z]+(?<![_.])$/)
    .required()
    .min(3),
});

// const loginMailValidation = Joi.object({
//   password: Joi.string().required().min(8),
//   email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .required()
//     .min(8),
// });

const loginUsernameValidation = Joi.object({
  password: Joi.string().required().min(8),
  username: Joi.string().required().min(3),
});

const viewsCountUpdateValidation = Joi.object({
  username: Joi.string().required().min(3),
});

module.exports = {
  createValidation,
  // loginMailValidation,
  loginUsernameValidation,
  viewsCountUpdateValidation,
};
