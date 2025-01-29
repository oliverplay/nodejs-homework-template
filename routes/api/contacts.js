const express = require("express");
const { listContacts, getContactById, addContact, removeContact, updateContact, updateFavorite } = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.delete("/:id", removeContact);
router.put("/:id", updateContact);
router.patch("/:id/favorite", updateFavorite);

module.exports = router;
