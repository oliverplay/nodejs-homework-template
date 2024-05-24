import Joi from "joi";

//define validation for adding and updating a contact
const contactValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

//define validation for updating favorite field
const favoriteValidation = Joi.object({
    favorite: Joi.bool().required(),
});

export { contactValidation, favoriteValidation };