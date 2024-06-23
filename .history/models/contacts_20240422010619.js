import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { httpError } from "../helpers/httpError.js";
import { contactValidation } from "../validations/validations.js";

const contactsPath = path.join("models", "contacts.json");

const listContacts = async (_req, res) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    res.json(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact ID Not Found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addContact = async (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, phone } = req.body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    let data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Error removing contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateContact = async (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    let data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return res.status(404).json({ message: "Contact ID Not Found" });
    }
    contacts[index] = { ...contacts[index], name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.json(contacts[index]);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//prettier-ignore
export { listContacts, getContactById, removeContact, addContact, updateContact };
