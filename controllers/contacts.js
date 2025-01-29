const Contact = require("../models/contact");

//GET /api/contacts
const listContacts = async (req, res, next) => {
	try {
		const contacts = await Contact.find();
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
};

//GET /api/contacts/:id
const getContactById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await Contact.findById(id);
		if (!contact) {
			return res.status(404).json({ message: "Contact not found ^_^" });
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

//POST /api/contacts
const addContact = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		if (!name || !email || !phone) {
			return res.status(400).json({ message: "Missing required fields!^_^" });
		}
		const newContact = new Contact({ name, email, phone });
		await newContact.save();
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
};

//DELETE /api/contacts/:id
const removeContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await Contact.findByIdAndDelete(id);
		if (!contact) {
			return res.status(404).json({ message: "Contact not found ^_^" });
		}
		res.status(200).json({ message: "Contact deleted ^_^" });
	} catch (error) {
		next(error);
	}
};

//PUT /api/contacts/:id
const updateContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updateData = req.body;
		if (!Object.keys(updateData).length) {
			return res.status(400).json({ message: "Missing fileds! ^_^" });
		}
		const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
		if (!contact) {
			res.status(404).json({ message: "Contact not found ^_^" });
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

//PATCH /api/contacts/:id/favorite
const updateFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { favorite } = req.body;
		if (typeof favorite !== "boolean") {
			return res.status(400).json({ message: "Missing field favorite! ^_^" });
		}
		const contact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
		if (!contact) {
			return res.status(404).json | { message: "Contact not found ^_^" };
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateFavorite,
};
