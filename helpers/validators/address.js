const joi = require("@hapi/joi");

module.exports.createAddressValidator = joi.object().keys({
  firstName: joi.string().min(1).required(),
  lastName: joi.string().min(1).required(),
  addressLine1: joi.string().min(1).required(),
  addressLine2: joi.string().min(1).required(),
  postalCode: joi.number().min(1).required(),
  
  city: joi.string().min(1).required(),
  state: joi.string().min(1).required(),
  country: joi.string().min(1).required(),

  email: joi.string().email().min(1).required(),
  phone: joi.string().min(1).required(),
});

module.exports.updateAddressValidator = joi.object().keys({
  firstName: joi.string().min(1),
  lastName: joi.string().min(1),
  addressLine1: joi.string().min(1),
  addressLine2: joi.string().min(1),
  postalCode: joi.number(),

  city: joi.string().min(1),
  state: joi.string().min(1),
  country: joi.string().min(1),

  email: joi.string().email().min(1),
  phone: joi.string().min(1),
});
// waitUntil: "domcontentloaded" 
// waitUntil: "networkidle2",