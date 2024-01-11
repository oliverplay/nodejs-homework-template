const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    
    data: {
      result,
    },
  });
};

module.exports = getById;