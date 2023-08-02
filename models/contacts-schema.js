const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is required',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'phone is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'email is required',
  }),
});

module.exports = schema;
