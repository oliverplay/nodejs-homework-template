import express from "express";
import { controlWrapper } from "../../helpers/controlWrapper.js";
import { getAllContacts, getContactsById, deleteContactsById, addContacts, updateContactsById } from "../../controllers/contactsController.js";


const router = express.Router();

//GET: http://localhost:3000/api/contacts
router.get("/", controlWrapper(getAllContacts));

//GET: http://localhost:3000/api/contacts/qdggE76Jtbfd9eWJHrssH
router.get("/:contactId", controlWrapper(getContactsById));

/*POST: http://localhost:3000/api/contacts/
{
  "id": 11,
  "name": "Isaac Schlueter",
  "email": "isaac@example.com",
  "phone": "(707) 445-3322"

} */
router.post("/", controlWrapper(addContacts));

//DELETE: http://localhost:3000/api/contacts/AeHIrLTr6JkxGE6SN-0Rw
router.delete("/:contactId", controlWrapper(deleteContactsById));

/*PUT: http://localhost:3000/api/contacts/11 
{
  "email":  "isaac-schlueter@foxtrot.com",
  "phone": "(420) 123-7777"
}
*/
router.put("/:contactId", controlWrapper(updateContactsById));

export { router };
