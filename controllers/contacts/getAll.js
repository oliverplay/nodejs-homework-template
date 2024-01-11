const {Contact} = require("../../schemas/mongoModel");

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

module.exports = getAll;