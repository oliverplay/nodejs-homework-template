const { ctrlWrapper, HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts.js");

const updateStatus = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "not found");
  res.json(result);
};

module.exports = { updateStatus: ctrlWrapper(updateStatus) };
