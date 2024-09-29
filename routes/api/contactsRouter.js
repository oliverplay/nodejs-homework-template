import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { addContact, deleteContactById, getAllContacts, getContactById, updateContactById, updateStatusContact } from "../../controllers/contactsController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = express.Router();

/* GET: // http://localhost:3000/api/contacts */
router.get("/", authenticateToken, ctrlWrapper(getAllContacts));

/* GET: // http://localhost:3000/api/contacts/:contactId */
router.get("/:contactId", authenticateToken, ctrlWrapper(getContactById));

/* POST: // http://localhost:3000/api/contacts/ 
{
    "name": "Valerie Oblea",
    "email": "valerieoblea@example.com",
    "phone": "(639) 840-6611"
} 
*/
router.post("/", authenticateToken, ctrlWrapper(addContact));

/* DELETE: // http://localhost:3000/api/contacts/:contactId */
router.delete("/:contactId", authenticateToken, ctrlWrapper(deleteContactById));

/* PUT: // http://localhost:3000/api/contacts/:contactId 
{
    "name": "Maria Maaliw",
    "email": "mariamaaliw@example.com",
    "phone": "(637) 456-5578"
} 
*/
router.put("/:contactId", authenticateToken, ctrlWrapper(updateContactById));

/* PATCH: // http://localhost:3000/api/contacts/:contactId/favorite
{
    "favorite": true,
}
*/
// prettier-ignore
router.patch("/:contactId/favorite", authenticateToken, ctrlWrapper(updateStatusContact));

export default router;
