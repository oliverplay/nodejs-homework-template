import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";
import { contactValidation } from "../../validations/validation.js";
import { httpError } from "../../helpers/httpError.js";

const router = express.Router();

// GET: // http://localhost:3000/api/contacts
router.get("/", async (_req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET: // http://localhost:3000/api/contacts/AeHIrLTr6JkxGE6SN-0Rw
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      throw httpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/* POST: // http://localhost:3000/api/contacts/ 
{
    "id": 1,
    "name": "Valerie Oblea",
    "email": "valerieoblea@example.com",
    "phone": "+639012578943"
} 
*/
router.post("/", async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "missing required name field");
    }

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// DELETE: // http://localhost:3000/api/contacts/1
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      throw httpError(404);
    }

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

/* PUT: // http://localhost:3000/api/contacts/1
{
    "name": "Joanna Shaw",
    "email": "shaw@example.com"
} 
*/
router.put("/:contactId", async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      throw httpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router };
