const contactsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;