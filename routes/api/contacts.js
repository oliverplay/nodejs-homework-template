const express = require('express')
const contacts = require('../../models/contacts.json');
const router = express.Router();
const {v4} = require("uuid");

router.get('/', async (req, res, next) => {
  res.json({
    status:'success',
    code:200,
    data:{
      contacts,
    },
  });
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const [contact] = contacts.filter(contact => contact.id === contactId);
  if(!contact){
    res.status(400).json({message: "contact not found"})
  }
  res.json({
    status:'success',
    code:200,
    data:{contact}
  })
})

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body;
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  res.status(201).json({
    status:'success',
    code:201,
    data:{newContact}
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contact = contacts.filter(el => el.id !== contactId); 
  contacts =[...contact] 
  res.status(204).json();
})

router.put('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const {name, email, phone} = req.body;
  const updatedContact = contacts.filter(contact => contact.id === contactId);
  updatedContact.name = name;
  updatedContact.email = email;
  updatedContact.phone = phone;
  res.json({
    status:'success',
    code:200,
    data:{updatedContact}
  })
})

module.exports = router
