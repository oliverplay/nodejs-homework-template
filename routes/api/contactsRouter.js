import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { getAllContacts, getContactsById, addContact, deleteContact, updateContactById} from "../../controllers/contactsController.js";

const router = express.Router();

/* GET: // http://localhost:3000/api/contacts
 */
router.get("/", ctrlWrapper(getAllContacts));

/* GET: // http://localhost:3000/api/contacts/1
 */
router.get("/:contactId", ctrlWrapper(getContactsById));

/* POST: // http://localhost:3000/api/contacts/ 
{
    "id": 3,
    "name": "Marvin Pacis",
    "email": "marvinpacis@example.com"
} 
*/
router.post("/", ctrlWrapper(addContact));

/* DELETE: // http://localhost:3000/api/contacts/1
 */
router.delete("/:contactId", ctrlWrapper(deleteContact));

/* PUT: // http://localhost:3000/api/contacts/1
{
    "name": "Joanna Shaw",
    "email": "shaw@example.com"
} 
*/
router.put("/:contactId", ctrlWrapper(updateContactById));

export { router };