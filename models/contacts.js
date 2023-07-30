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
   const findUser = jsonDate.find(item => item.id === contactId)
           if (!findUser) {
      const message = `Not Found`;
      return { message };
           } else {
        const newList = jsonDate.filter(item => item.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(newList))     
         const message = `contact deleted`;    
         return { message };    
    }
  } catch (error) {
    return { error }
  }

}

const addContact = async (body) => {
  try {
const data = await fs.readFile(contactsPath) 
  const jsonDate = JSON.parse(data)
  jsonDate.push(body)
    await fs.writeFile(contactsPath, JSON.stringify(jsonDate))
    const addedContact = body
  return { addedContact };  
    }
   catch (error) {
    return { error }
  }
}

const updateContact = async (contactId, body) => {
  const {name, email, phone} = body
  try {
  const data = await fs.readFile(contactsPath) 
    const jsonDate = JSON.parse(data)

    const findUser = jsonDate.findIndex(item => item.id === contactId)
           if (findUser === -1) {
      const message = `Not Found`;
      return { message };
           } else {
             jsonDate[findUser] = { ...jsonDate[findUser], name, email, phone }
        
             await fs.writeFile(contactsPath, JSON.stringify(jsonDate))
    const updateContact = jsonDate[findUser]
  return { updateContact };  
    }
    
  }
  catch (error) {
    return { error }
  }





}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
