import express from "express";
import { controlWrapper } from "../../helpers/controlWrapper.js";
import { getAllContacts, getContactById, deleteContactById, addContact, updateContactById, updateStatusContact } from "../../controllers/contactsController.js";


const router = express.Router();

/* GET< http://localhost:3500/api/contacts */
router.get("/", controlWrapper(getAllContacts));

/* GET< http://localhost:3500/api/contacts/qdggE76Jtbfd9eWJHrssH */
router.get("/:contactId", controlWrapper(getContactById));

/*POST< http://localhost:3500/api/contacts/
{
  "name": "Bert Belder",
  "email": "bertbelder@eudoramail.com",
  "phone": "+31 20 421 8344"

} */
router.post("/", controlWrapper(addContact));

/* DELETE< http://localhost:3500/api/contacts/:contactId/ */
router.delete("/:contactId", controlWrapper(deleteContactById));

/* PUT< http://localhost:3500/api/contacts/:contactsId 
{
  "email":  "isaac-schlueter@foxtrot.com",
  "phone": "(420) 123-7777"
}
*/
router.put("/:contactId", controlWrapper(updateContactById));

/* PATCH< http://localhost:3500/api/contacts/:contactId/favorite 
{
  "favorite": true,
}
*/
router.patch("/:contactId/favorite", controlWrapper(updateStatusContact));

export { router };
