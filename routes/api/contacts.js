const express = require('express')
const contactFunctions = require("../../models/contacts");
const Joi = require('joi');
const router = express.Router()
const uuid = require('uuid');


const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})




router.get('/', async (req, res, next) => {
   try {
    const contacts = await contactFunctions.listContacts();
    res.status(200).json({
      data: {
        contacts,
      }
    })
  }
  catch (error) {
    next(error)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactFunctions.getContactById(contactId);
  const { error, message, findUser } = result;
  if (error) {
    return next(error)
  } else if (message) {
    return res.status(404).json({
      message: message,
    });
  } else {
    res.status(200).json({
      contact: findUser,
    })
  }
} 
)

router.post('/', async (req, res, next) => {
  const { error, value } =  schema.validate(req.body, {abortEarly:false})
  if (error) {
    return res.status(404).json({
      message: "missing required name field",
    });
  } else {
 const newContact = {
      id: uuid.v4(),
      name: value.name,
      email: value.email,
      phone: value.phone,
    };
    const result = await contactFunctions.addContact(newContact);
    const { error, message, addedContact } = result;

    if (error) {
      return next(error);
    } else if (message) {
      return res.status(400).json({
        message: message,
      });
    } else if (addedContact) {
      res.status(201).json({
       contact: addedContact,
      });
    }
  }
}); 
  
  



router.delete('/:contactId', async (req, res, next) => {
 const { contactId } = req.params;
  const result = await contactFunctions.removeContact(contactId);
  const { error, message } = result;
  if (error) {
    return next(error)
  } else if (message === "Not found") {
    return res.status(404).json({
      message: message,
    });
  } else {
    res.status(200).json({
       message: message,
    })
  }
} 
)

router.put('/:contactId', async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "missing required fields",
    });
  } else {
    const { error, value } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        message: "missing or invalid fields",
        error: error,
      });
    } else {
      const { contactId } = req.params;
      const result = await contactFunctions.updateContact(contactId, value);
      const { error, message, updateContact } = result;

      if (error) {
        return next(error);
      } else if (message) {
        return res.status(404).json({
          message: message,
        });
      } else if (updateContact) {
        res.status(200).json({
          contact: updateContact,
        });
      }
    }
  }
})

module.exports = router
