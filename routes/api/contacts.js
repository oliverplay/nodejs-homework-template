const express = require('express');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts');

const router = express.Router();

// GET all contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

// GET contact by ID
router.get('/:id', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

// POST new contact
router.post('/', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
  });

  try {
    const validatedData = await schema.validateAsync(req.body);
    const newContact = await addContact(validatedData);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// DELETE contact by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

// PUT update contact by ID
router.put('/:id', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
  }).or('name', 'email', 'phone');

  try {
    const validatedData = await schema.validateAsync(req.body);
    const updatedContact = await updateContact(req.params.id, validatedData);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
