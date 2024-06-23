import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { addContact, deleteContactById, getAllContacts, getContactById, updateContactById, updateStatusContact } from "../../controllers/contactsController.js"
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(deleteContactById));

router.put("/:contactId", ctrlWrapper(updateContactById));

router.patch("/:contactId/favorite", ctrlWrapper(updateStatusContact));

export { router };
