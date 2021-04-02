const joi = require("@hapi/joi");
module.exports.registerValidator = joi.object().keys({
  full_name: joi.string().min(1),
  email: joi.string().email(),
  phone: joi.number().min(11),
  userType: joi.string(),
  password: joi.string().min(8)
});

module.exports.loginValidator = joi.object().keys({
  email: joi.string().required(),
  password: joi
    .string()
    .min(6)
    .required()
});

module.exports.profileValidator = joi.object().keys({
  full_name: joi.string().min(1),
  email: joi.string().email(),
  password: joi.string().min(6),
  phone: joi.number().min(11),
  password: joi.string().min(8)
});
