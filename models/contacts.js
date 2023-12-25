const fs = require('fs').promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactsDB = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsDB);
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({id}) => id === String(contactId))
  return contact || null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdSrt = String(contactId);
  const index = contacts.findIndex(({id}) => id === contactIdSrt)
  if(index === -1){
    return null
  }
  const deletedContact = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact
}


const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
  id: nanoid(),
  ...body
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact

}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1){
    return null
  }
  contacts[contactId] = {id: contactId, ...body}
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
