const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
});

async function validateContact(contact) {
  try {
    await contactSchema.validateAsync(contact);
  } catch (error) {
    throw new Error(error.details[0].message);
  }
}

module.exports = { validateContact };
