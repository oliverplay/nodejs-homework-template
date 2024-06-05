const contactsData = require('./contacts.json');

const listContacts = () => contactsData;

const getContactById = (contactId) => contactsData.find((contact) => contact.id === contactId);

const removeContact = (contactId) => {
  const index = contactsData.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contactsData.splice(index, 1);
    return true;
  }
  return false;
};

const addContact = (body) => {
  const newContact = { id: Math.random().toString(), ...body };
  contactsData.push(newContact);
  return newContact;
};

const updateContact = (contactId, body) => {
  const index = contactsData.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contactsData[index] = { ...contactsData[index], ...body };
    return contactsData[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
