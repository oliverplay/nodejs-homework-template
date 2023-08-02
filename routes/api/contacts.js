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
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res) => {
  const contact = await getContactById(
    req.params.contactId
  );
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
  }
  res.json(contact);
});

router.post('/', async (req, res) => {
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const validate = schema.validate(newContact);
  if (validate.error) {
    res
      .status(400)
      .json({ message: validate.error.message });
  } else {
    const addedContact = await addContact(newContact);
    res.json(addedContact);
  }
});

router.delete('/:contactId', async (req, res) => {
  const deleteContact = await removeContact(
    req.params.contactId
  );
  if (!deleteContact) {
    res.status(404).json({ message: 'Contact not found' });
  }
  res.json(deleteContact);
});

router.put('/:contactId', async (req, res, next) => {
  const newContact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  };
  const validate = schema.validate(newContact);
  if (validate.error) {
    res
      .status(400)
      .json({ message: validate.error.message });
  } else {
    const updatedContact = await updateContact(
      req.params.contactId,
      newContact
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res
        .status(404)
        .json({ message: 'Contact not found' });
    }
  }
});

module.exports = router;
