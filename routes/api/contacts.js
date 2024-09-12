const express = require('express');
const router = express.Router();
const validateContact = require('../../helpers/validateContact'); // Ensure this helper is correctly defined
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../models/contacts'); // Correct path to the models

// POST request to add a new contact
router.post('/', async (req, res, next) => {
  try {
    // Validate the request body
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Add the new contact
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
