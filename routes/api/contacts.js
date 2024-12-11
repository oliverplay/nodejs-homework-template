const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

// field-uri obligatorii la adaugarea unui Contact
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// cel putin un field trebuie modificat pt update
const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

// list all contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

// getContactById
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact)
      return res.status(404).json({ message: "Contact Not Found ^_^" });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

// add a new Contact
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: "Missing required fileds ^_^" });

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// remove a Contact
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact)
      return res.status(404).json({ message: "Contact Not Found in list ^_^" });
    res.status(200).json({ message: "Contact deleted successfully ^_^" });
  } catch (error) {
    next(error);
  }
});

// update a Contact
router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: "Missing fiels ^_^" });
    const updatedContact = await updateContact(contactId);
    if (!updatedContact)
      return res.status(404).json({ message: "Contact Not Found in list ^_^" });
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
