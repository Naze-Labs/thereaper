const joi = require("@hapi/joi");

module.exports.createTaskValidator = joi.object().keys({
  billingAddress: joi.string(),
  shippingAddress: joi.string(),
  card: joi.string(),
  size: joi.string(),
  product_name: joi.string().min(1).required(),
  email: joi.string().email().min(5),
  password: joi.string().min(4),
  item_url: joi.string().min(4).required(),
  ccv: joi.number(),
  countdown: joi.number(),
  machine: joi.any(),

});

module.exports.updateTaskValidator = joi.object().keys({
  card: joi.string(),
  size: joi.string(),
  billingAddress: joi.string(),
  shippingAddress: joi.string(),
  product_name: joi.string().min(1).required(),
  email: joi.string().email().min(5),
  password: joi.string().min(4),
  item_url: joi.string().min(4),
  ccv: joi.number(),
  countdown: joi.number(),
  machine: joi.any(),
});
