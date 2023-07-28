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
  const { name, email, phone } = req.params;
  console.log('name')
    console.log(name)
    console.log('email')
  console.log(email)
    console.log('phone')

  console.log(phone)

  if (name === '') {
    const message = "missing required name field"
    return res.json({
      message: message,
    })
  } else {
    if (email === '') {
      const message = "missing required Email field"
      return res.json({
        message: message,
      })
    }
    else {
      if (phone === '') {
        const message = "missing required phone field"
        return res.json({
          message: message,
        })
      } else {
        const message = "all fields filled in with info"
        return res.json({
         parms: req.params,
          message: message,
        })
      
      }
    }
  }
   })
  
  



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
  res.json({
    message: 'template message'
  })
})

module.exports = router
