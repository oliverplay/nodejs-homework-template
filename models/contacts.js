// const fs = require('fs/promises')
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("Contact", contactSchema);

module.exports = {
  schemas,
  Contact,
};
