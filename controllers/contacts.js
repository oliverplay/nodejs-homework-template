const ctrlWrapper = require("../helpers/ctrlWrapper.js");
const HttpError = require("../helpers/HttpError.js");
const contacts = require("../models/contacts.js");

// const getAll = async (req, res) => {
//   const result = await contacts.listContacts();
//   res.json(result);
// };

const getById = async (req, res) => {
  const id = req.params.contactId;
  const result = await contacts.getContactById(id);
  if (!result) throw HttpError(404, "not found");
  res.json(result);
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const result = await contacts.removeContact(id);
  if (!result) throw HttpError(404, "not found");
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const result = await contacts.updateContact(id, req.body);
  if (!result) throw HttpError(404, "not found");
  res.json(result);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  add: ctrlWrapper(add),
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
};
