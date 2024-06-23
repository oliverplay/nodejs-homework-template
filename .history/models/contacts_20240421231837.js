import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactspath = path,join("models", "contacts.json");

const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

// prettier-ignore
export { listContacts, getContactById, removeContact, addContact, updateContact,}
