// routes/contacts.js
const express = require('express');
const router = express.Router();
const validateContact = require('../../helpers/validateContact');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../models/contacts');

router.post('/', async (req, res, next) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
