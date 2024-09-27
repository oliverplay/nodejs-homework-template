const fs = require('fs/promises')
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");
const {v4} = require('uuid')

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts(); 
  const contact = contacts.filter(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId.toString());

    // If the contact with the given contactId is not found, return null.
  if (index === -1){
    return null;
  }

  // Use splice to remove the contact at the found index (index), and capture it in 'removedContact'.
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts))

  return removedContact;

}

const addContact = async (body) => {
  const contacts = await listContacts();
  const {name, email, phone} = body;
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact

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
