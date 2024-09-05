const express = require('express');
const router = express.Router();
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const updatedContact = await updateStatusContact(req.params.contactId, { favorite });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
