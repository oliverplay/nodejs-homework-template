const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const Joi = require('joi');

const contactsRouter = require('./routes/api/contacts')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// Middleware setup
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

// Path to contacts.json
const contactsPath = path.join(__dirname, 'contacts.json');

// Helper functions
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
};

const getById = async (id) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === id);
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: `${contacts.length + 1}`, ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  }
  return false;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }
  return null;
};

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10,15}$/).required(),
});

// Routes
// @ GET api/contacts
app.get('api/contacts', async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

// @ GET api/contacts/:id
app.get('api/contacts/:id', async (req, res) => {
  const contact = await getById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
});

// @ POST api/contacts
app.post('api/contacts', async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

// @ DELETE api/contacts/:id
app.delete('api/contacts/:id', async (req, res) => {
  const success = await removeContact(req.params.id);
  if (success) {
    res.status(200).json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
});

// @ PUT api/contacts/:id
app.put('api/contacts/:id', async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updatedContact = await updateContact(req.params.id, req.body);
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app
