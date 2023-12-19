const { ctrlWrapper, HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts.js");

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "not found");
  res.json(result);
};

module.exports = { updateById: ctrlWrapper(updateById) };
