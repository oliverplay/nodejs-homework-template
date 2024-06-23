import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { httpError } from "../../helpers/httpError.js";
import { contactValidation } from "../../validations/validations.js";

const contactspath = path.join("models", "contacts.json");

const listContacts = (_req, res) => {
  res.json(contactspath);
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

// prettier-ignore
export { listContacts, getContactById, removeContact, addContact, updateContact,}
