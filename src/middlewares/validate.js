const httpStatus = require("http-status");
const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      ?.map((detail) => detail.message)
      .join(" ");
    return res.status(httpStatus.BAD_REQUEST).json({
      message: errorMessage,
      success: false,
    });
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
