const joi = require("@hapi/joi");

module.exports.createCardValidator = joi.object().keys({
  friendlyName: joi.string().min(1).required(),
  nameOnCard: joi.string().min(1).required(),
  cardNumber: joi.number().min(1).required(),
  expirationYear: joi.number().min(2).required(),
  expirationMonth: joi.number().min(2).required(),
  securityCode: joi.number().min(1).required(),
});

module.exports.updateCardValidator = joi.object().keys({
  friendlyName: joi.string().min(1),
  nameOnCard: joi.string().min(1),
  cardNumber: joi.number().min(1),
  expirationYear: joi.number().min(2),
  expirationMonth: joi.number().min(2),
  securityCode: joi.number().min(3),
});
