import { listContacts, getContactById, removeContact, addContact, updateContactById } from "../models/contacts.js";
import { contactValidation } from "../validations/validation.js";
import { httpError } from "../helpers/httpError.js";

const getAllContacts = async (_req, res) => {
    const result = await listContacts();
    res.json(result);
};

const getContactsById = async (req, res) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
        throw httpError(404);
    }

    res.json(result);
};

const deleteContactsById = async (req, res) => {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
        throw httpError(404);
    }
    res.json({ message: "Contact deleted", });
};

const addContacts = async (req, res) => {
    //Preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);
    if (error) {
        throw httpError(400, "missing required name field");
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
};

const updateContactsById = async (req, res) => {
    //Preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);
    if (error) {
        throw httpError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body);

    if (!result) {
        throw httpError(404);
    }
    //res.json(result);
    res.status(201).json(result);
};

export { getAllContacts, getContactsById, addContacts, deleteContactsById, updateContactsById };