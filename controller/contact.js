const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const result = await Contact.find({ owner }).populate("owner", "name email");
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  const { email } = req.body;
  const { _id: owner } = req.user;

  try {
    const isContactExist = await Contact.findOne({ email });
    if (isContactExist) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted." });
  } catch (err) {
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
