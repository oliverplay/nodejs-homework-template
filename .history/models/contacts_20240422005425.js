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

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      throw httpError(404, "Contact ID Not Found");
    }

    res.json(contact);
  } catch (error) {
    next(httpError(500, "Internal Server Error"));
  }
};

const addContact = async (req, res, next) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    return next(httpError(400, error.details[0].message));
  }

  const { name, email, phone } = req.body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(201).json(newContact);
  } catch (error) {
    next(httpError(500, "Internal Server Error"));
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    let data = await fs.promises.readFile(contactsPath);
    let contacts = JSON.parse(data);
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(httpError(500, "Internal Server Error"));
  }
};

const updateContact = async (req, res, next) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    return next(httpError(400, error.details[0].message));
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    let data = await fs.promises.readFile(contactsPath);
    let contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw httpError(404, "Contact ID Not Found");
    }
    contacts[index] = { ...contacts[index], name, email, phone };
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    res.json(contacts[index]);
  } catch (error) {
    next(httpError(500, "Internal Server Error"));
  }
};

// prettier-ignore
export { listContacts, getContactById, removeContact, addContact, updateContact,}
