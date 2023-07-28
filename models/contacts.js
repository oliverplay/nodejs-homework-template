const fs = require('fs/promises');
const  path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
 try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return { error }
  }
}

const getContactById = async (contactId) => {
 try {
   const data = await fs.readFile(contactsPath);
   const jsonDate = JSON.parse(data);
   const findUser = jsonDate.find(item => item.id === contactId)
           if (!findUser) {
      const message = `Not Found`;
      return { message };
    } else {
      return { findUser };
    }
  } catch (error) {
    return { error }
  }

}

const removeContact = async (contactId) => {
  try {
   const data = await fs.readFile(contactsPath);
   const jsonDate = JSON.parse(data);
   const findUser = jsonDate.find(item => item.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(findUser))
    return {findUser}
  } catch (error) {
    return { error }
  }
  
}

const addContact = async (body) => {



}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
