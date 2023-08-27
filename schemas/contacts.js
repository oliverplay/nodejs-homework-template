const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
      .pattern(new RegExp(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/))
      .required(),
  
    email: Joi.string().email().required(),
  
    phone: Joi.string()
      .pattern(new RegExp(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/))

      .required(),
    
    favorite: Joi.boolean(),
  });

  const schemaUpdateFavorite = Joi.object({
    favorite: Joi.boolean().required(),

  });

  const customMessages = {
    'string.base': '{#label} must be string',
    'string.empty': '{#label} can not be empty',
    'string.email': '{#label} incorrect',
    'any.required': 'missing required {#label} field',
  };

  const options = {
    messages: customMessages,
  };

  module.exports = {
    schema,
    options,
    schemaUpdateFavorite,
  }