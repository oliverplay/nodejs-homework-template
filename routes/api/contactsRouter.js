import express from "express";
import { controlWrapper } from "../../helpers/controlWrapper.js";
import { getAllContacts, getContactById, deleteContactById, addContact, updateContactById, updateStatusContact } from "../../controllers/contactsController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";


const router = express.Router();

/* GET< http://localhost:3001/api/contacts */
router.get("/", authenticateToken, controlWrapper(getAllContacts));

/* GET< http://localhost:3001/api/contacts/qdggE76Jtbfd9eWJHrssH */
router.get("/:contactId", authenticateToken, controlWrapper(getContactById));

/*POST< http://localhost:3001/api/contacts/
{
  "name": "Bert Belder",
  "email": "bertbelder@eudoramail.com",
  "phone": "+31 20 421 8344"

} */
router.post("/", authenticateToken, controlWrapper(addContact));

/* DELETE< http://localhost:3001/api/contacts/:contactId/ */
router.delete("/:contactId", authenticateToken, controlWrapper(deleteContactById));

/* PUT< http://localhost:3001/api/contacts/:contactsId 
{
  "email":  "isaac-schlueter@foxtrot.com",
  "phone": "(420) 123-7777"
}
*/
router.put("/:contactId", authenticateToken, controlWrapper(updateContactById));

/* PATCH< http://localhost:3001/api/contacts/:contactId/favorite 
{
  "favorite": true,
}
*/
router.patch("/:contactId/favorite", authenticateToken, controlWrapper(updateStatusContact));

export { router };
