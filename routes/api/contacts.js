const express = require('express')
const contactFunctions = require("../../models/contacts");

const router = express.Router()

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
 const { NewContact } = req.params;
  const result = await contactFunctions.getContactById(NewContact);
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

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
