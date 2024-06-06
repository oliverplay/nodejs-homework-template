const { readJsonFile, writeJsonFile } = require('../validation/jsonUtils');

const CONTACTS_FILE_PATH = 'models/contacts.json';

async function listContacts() {
  try {
    return await readJsonFile(CONTACTS_FILE_PATH);
  } catch (error) {
    console.error('Error listing contacts:', error);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
      await writeJsonFile(CONTACTS_FILE_PATH, contacts);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing contact:', error);
    throw error;
  }
}

async function addContact(body) {
  try {
    let contacts = await listContacts();
    const newContact = { id: Math.random().toString(), ...body };
    contacts.push(newContact);
    await writeJsonFile(CONTACTS_FILE_PATH, contacts);
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
}

async function updateContact(contactId, body) {
  try {
    let contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...body };
      await writeJsonFile(CONTACTS_FILE_PATH, contacts);
      return contacts[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
