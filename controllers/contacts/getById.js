const ctrlWrapper = require("../helpers/ctrlWrapper.js");
const { Contact } = require("../../models/contacts.js");
const getById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findOn({ _id: id });
  if (!result) throw HttpError(404, "not found");
  res.json(result);
};

module.exports = { getById: ctrlWrapper(getById) };
