const fs = require('fs/promises');
const path = require('path');
const { uuid } = require('uuidv4');


const contactPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(list)
}

const getContactById = async (contactId) => {
  const list = await listContacts();

const contact = list.find((item) => item.id === contactId);
return contact || null;
};

const removeContact = async (contactId) => {
  const list = await listContacts();

  const index = list.findIndex((item) => item.id === contactId);

  if(index === -1) {
    return null;
  }
}


const addContact = async (body) => {
const list = await listContacts();

const newContact = {
  id: uuid(),
  ...body,
};
list.push(newContact);
await fs.writeFile(contactPath, JSON.stringify(list, null, 2));

return newContact;
}

const updateContact = async (contactId, body) => {
 const list = await listContacts();

 const index = list.findIndex((item) => item.id === contactId);

 if(index === -1) {
  return null;
 }

 list[index] = { id: contactId, ...body};

 await fs.writeFile(contactPath, JSON.stringify(list, null, 2));

 return list[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
