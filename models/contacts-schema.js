const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be a type of 'string'`,
    'any.required': `"name" is a required field`,
  }),
  phone: Joi.string().required().messages({
    'string.base': `"phone" should be a type of 'string'`,
    'any.required': `"phone" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a type of 'string'`,
    'any.required': `"email" is a required field`,
  }),
  favorite: Joi.boolean(),
});

module.exports = schema;
