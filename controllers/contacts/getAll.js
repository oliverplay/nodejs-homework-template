const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contacts.js");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
