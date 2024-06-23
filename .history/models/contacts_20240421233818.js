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
  const contact = mockData.find(
    (contact) => contact.id === parseInt(contactId)
  );

  if (!contact) {
    throw httpError(404, "Contact ID Not Found");
  }

  res.json(contact);
};

const removeContact = (req, res) => {
  const { contactId } = req.params;
  mockData.filter((contact) => contact.id !== parseInt(contactId));
  res.json({ message: "Contact deleted" });
};

const addContact = (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = { id: mockData.length + 1, name, email, phone };
  mockData.push(newContact);
  res.status(201).json(newContact);
};

const updateContact = (req, res) => {
  const { contactId } = req.params;
  const { name, email } = req.body;
  const index = mockData.findIndex(
    (contact) => contact.id === parseInt(contactId)
  );
  if (index === -1) {
    throw httpError(404, "Contact ID Not Found");
  }

  mockData[index] = { ...mockData[index], name, email };
  res.json(mockData[index]);
};

// prettier-ignore
export { listContacts, getContactById, removeContact, addContact, updateContact,}
