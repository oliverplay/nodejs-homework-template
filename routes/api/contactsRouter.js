import express from "express";
// import { mockData } from "../../models/mockData.js";
// prettier-ignore
import { listContacts, getContactById, removeContact, addContact, updateContact } from "../../models/contacts.js";
import { contactValidation } from "../../validations/validation.js";
import { httpError } from "../../helpers/httpError.js";

const router = express.Router();

// Read
// http://localhost:3000/api/contacts/
router.get("/", async (_req, res, next) => {
  // res.json({ message: "template message" });
  try {
    // Logic Here
    const result = await listContacts();
    res.json(result);
    // res.json(mockData);
  } catch (error) {
    next(error);
  }
});
// Read
// http://localhost:3000/api/contacts/1
router.get("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    // Logic here
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    // const contact = mockData.find(
    //   (contact) => contact.id === parseInt(contactId)
    // );
    // if (!contact) {
    //   const err = new Error("Contact not found");
    //   err.status = 404;
    //   return next(err);
    // }
    if (!result) {
      throw httpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});
// create
// http://localhost:3000/api/contacts/
router.post("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    // Preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "missing required name field");
    }
    // const { name, email } = req.body;
    // const newContact = { id: mockData.length + 1, name, email };
    // mockData.push(newContact);
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
// Delete
// http://localhost:3000/api/contacts/2
router.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    // Logic here
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    // mockData.filter((contact) => contact.id !== parseInt(contactId));
    if (!result) {
      throw httpError(404);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});
// Update
// http://localhost:3000/api/contacts/2
router.put("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    // preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "missing field");
    }

    const { contactId } = req.params;
    // const { name, email } = req.body;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      throw httpError(404);
    }
    // const index = mockData.findIndex(
    //   (contact) => contact.id === parseInt(contactId)
    // );
    // if (index === -1) {
    //   const err = new Error("Contact not found");
    //   err.status = 404;
    //   return next(err);
    // }
    // mockData[index] = { ...mockData[index], name, email };
    // res.json(mockData[index]);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router };
// module.exports = router;
