import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { httpError } from "../../helpers/httpError.js";
import { contactValidation } from "../../validations/validations.js";

const contactspath = path.join("models", "contacts.json");

const listContacts = (_req, res) => {
  res.json(contactspath);
};

const getContactById = (req, res) => {
  const { contactId } = req.params;
  const contact = contactspath.find(
    (contact) => contact.id === parseInt(contactId)
  );

  if (!contact) {
    throw httpError(404, "Contact ID Not Found");
  }

  res.json(contact);
};

const addContact = (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = { id: contactspath.length + 1, name, email, phone };
  contactspath.push(newContact);
  res.status(201).json(newContact);
};

const removeContact = (req, res) => {
  const { contactId } = req.params;
  contactspath.filter((contact) => contact.id !== parseInt(contactId));
  res.json({ message: "Contact deleted" });
};

const updateContact = (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const index = contactspath.findIndex(
    (contact) => contact.id === parseInt(contactId)
  );
  if (index === -1) {
    throw httpError(404, "Contact ID Not Found");
  }

  contactspath[index] = { ...contactspath[index], name, email, phone };
  res.json(contactspath[index]);
};

// prettier-ignore
export { listContacts, getContactById, removeContact, addContact, updateContact,}
