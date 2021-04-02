const joi = require("@hapi/joi");

module.exports.createReleaseValidator = joi.object().keys({
  name: joi
    .string()
    .min(6)
    .required(),
  store: joi
    .string()
    .min(4)
    .required(),
  description: joi
    .string()
    .min(4)
    .required(),
  countdown: joi
    .number()
    .min(1)
    .required(),
  dueDate: joi.date()
});

module.exports.updateReleaseValidator = joi.object().keys({
  name: joi.string().min(6),
  store: joi.string().min(4),
  description: joi.string().min(4),
  countdown: joi.number().min(1),
  dueDate: joi.date()
});
