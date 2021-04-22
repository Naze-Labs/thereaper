const joi = require("@hapi/joi");

module.exports.createTaskValidator = joi.object().keys({
  billingAddress: joi.string().min(6),
  shippingAddress: joi.string().min(6),
  card: joi.string(),
  size: joi.string(),
  product_name: joi.string().min(1).required(),
  email: joi.string().email().min(5).required(),
  password: joi.string().min(4).required(),
  item_url: joi.string().min(4).required(),
  ccv: joi.number().required(),
});

module.exports.updateTaskValidator = joi.object().keys({
  card: joi.string(),
  size: joi.string(),
  billingAddress: joi.string().min(6),
  shippingAddress: joi.string().min(6),
  product_name: joi.string().min(1).required(),
  email: joi.string().email().min(5),
  password: joi.string().min(4),
  item_url: joi.string().min(4),
  ccv: joi.number(),
});
