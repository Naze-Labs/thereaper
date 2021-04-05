const joi = require("@hapi/joi")

module.exports.createTaskValidator = joi.object().keys({
  email: joi.string().email().min(5).required(),
  password: joi.string().min(4).required(),
  item_url: joi.string().min(4).required(),
  ccv: joi.number().required()
})

module.exports.updateTaskValidator = joi.object().keys({
  email: joi.string().email().min(5),
  password: joi.string().min(4),
  item_url: joi.string().min(4),
  ccv: joi.number()
})

