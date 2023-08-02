const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts.js');
const express = require('express');

const router = express.Router();

const schema = require('../../models/contacts-schema.js');

router.get('/', async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
});

router.get('/:contactId', async (req, res) => {
  const result = await getContactById(req.params.contactId);
  if (!result) {
    res.status(404).json({ message: 'Contact not found' });
  }
  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const validate = schema.validate(req.body);
  if (validate.error) {
    res
      .status(400)
      .json({ message: validate.error.message });
  } else {
    const result = await addContact(req.body);
    res.status(201).json(result);
  }
});

router.delete('/:contactId', async (req, res) => {
  const deleteContact = await removeContact(
    req.params.contactId
  );
  if (!deleteContact) {
    res.status(404).json({ message: 'Contact not found' });
  }
  res.status(200).json({ message: 'Contact deleted' });
});

router.put('/:contactId', async (req, res) => {
  const validate = schema.validate(req.body);
  if (validate.error) {
    res
      .status(400)
      .json({ message: validate.error.message });
  } else {
    const result = await updateContact(
      req.params.contactId,
      req.body
    );
    if (result) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ message: 'Contact not found' });
    }
  }
});

module.exports = router;
