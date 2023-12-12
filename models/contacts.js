// const fs = require('fs/promises')

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContact = await listContacts();
  const contact = allContact.find(({ id }) => contactId === id);
  return contact || null;
}

async function removeContact(contactId) {
  const removedContact = await getContactById(contactId);
  if (!removedContact) return null;
  const allContacts = await listContacts();
  const result = allContacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return removedContact;
}

async function addContact({ name, email, phone }) {
  const newContact = { name, email, phone, id: nanoid() };
  const allContacts = await listContacts();
  const result = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return newContact;
}

async function updateContact(id, body) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => {
    return contact.id === id;
  });
  if (index === -1) return null;
  allContacts[index] = body;
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
