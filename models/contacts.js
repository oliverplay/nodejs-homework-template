const fs = require('fs/promises')
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contact = contacts.filter(contact => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.filter(el => el.id !== contactId);
  contacts = [...contact];
  await fs.writeFile(filePath, JSON.stringify(contacts))

}

const addContact = async (body) => {
  const contacts = await listContacts();
  const {name, email, phone} = req.body;
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));

}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  // Find the index of the contact to be updated by matching its ID
  const index = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );

  // If the contact with the specified ID is not found, return null
  if (index === -1) {
    return null;
  }

  // If the request body is empty, return null
  if (!body) {
    return null;
  }

  // Update the contact's data by replacing it in the contacts array
  contacts[index] = { id: contactId, ...body };

  // Write the updated contacts array back to the JSON file
  await fs.writeFile(filePath, JSON.stringify(contacts));

  // Return the updated contact
  return contacts[index];
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
