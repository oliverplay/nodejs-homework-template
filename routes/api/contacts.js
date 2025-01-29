const express = require("express");
const { listContacts, getContactById, addContact, removeContact, updateContact, updateFavorite } = require("../../controllers/contacts");
const authMiddleware = require("../../controllers/auth");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
	const { page = 1, limit = 20, favorite } = req.query;
	const filter = favorite ? { favorite: JSON.parse(favorite) } : {};
	try {
		const contacts = await listContacts(page, limit, filter);
		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
router.get("/:id", authMiddleware, getContactById);
router.post("/", authMiddleware, addContact);
router.delete("/:id", authMiddleware, removeContact);
router.put("/:id", authMiddleware, updateContact);
router.patch("/:id/favorite", authMiddleware, updateFavorite);

module.exports = router;
