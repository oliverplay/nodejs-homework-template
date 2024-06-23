import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { httpError } from "../helpers/httpError.js";
import { contactValidation } from "../validations/validations.js";

const contactsPath = path.join("models", "contacts.json");

const listContacts = async (_req, res, next) => {
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    res.json(contacts);
  } catch (error) {
    next(httpError(500, "Internal Server Error"));
  }
};

const getContactById = (req, res) => {
  const { contactId } = req.params;
  const contact = contactsPath.find(
    (contact) => contact.id === parseInt(contactId)
  );

  if (!contact) {
    throw httpError(404, "Contact ID Not Found");
  }

  res.json(contact);
};

const addContact = (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing required name field");
  }

  const { name, email, phone } = req.body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsPath.push(newContact);
  res.status(201).json(newContact);
};

const removeContact = (req, res) => {
  const { contactId } = req.params;
  contactsPath.filter((contact) => contact.id !== parseInt(contactId));
  res.json({ message: "Contact deleted" });
};

const updateContact = (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing fields");
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const index = contactsPath.findIndex(
    (contact) => contact.id === parseInt(contactId)
  );
  if (index === -1) {
    throw httpError(404, "Contact ID Not Found");
  }

  contactsPath[index] = { ...contactsPath[index], name, email, phone };
  res.json(contactsPath[index]);
};

// prettier-ignore
export { listContacts, getContactById, removeContact, addContact, updateContact,}
