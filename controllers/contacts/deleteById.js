const { ctrlWrapper, HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts.js");

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdRemove({ _id: id });
  if (!result) throw HttpError(404, "not found");
  res.json({ message: "contact deleted" });
};

module.exports = { deleteById: ctrlWrapper(deleteById) };
