const express = require('express')
const contacts = require('../../models/contacts.json');
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = contacts.find(contact => contact.id === id);
  if(!contact){
    res.status(400).json({message: "contact not found"})
  }
})

router.post('/', async (req, res, next) => {
  const {id} = req.params;
  const {name, email, phone} = req.body;
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  res.json({contacts})
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contact = contacts.filter(el => el.id !== contactId);  
  res.json({contact});
})

router.put('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const {name, email, phone} = req.body;
  const updatedContact = contacts.filter(contact => contact.id === contactId);
  updatedContact.name = name;
  updatedContact.email = email;
  updatedContact.phone = phone;
  res.json({updatedContact})
})

module.exports = router
