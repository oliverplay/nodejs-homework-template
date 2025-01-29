const Contact = require("../models/contact");

//GET /api/contacts
const listContacts = async (page, limit, filter) => {
	const contacts = await Contact.find({ ...filter })
		.skip((page - 1) * limit)
		.limit(limit)
		.exec();
	const totalContacts = await Contact.countDocuments({ ...filter });
	return {
		totalContacts,
		totalPages: Math.ceil(totalContacts / limit),
		page,
		limit,
		contacts,
	};
};

//GET /api/contacts/:id
const getContactById = async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) return res.status(404).json({ message: "Contact not found" });
	res.status(200).json(contact);
};

//POST /api/contacts
const addContact = async (req, res) => {
	const { name, email, phone, favorite } = req.body;
	const contact = new Contact({ name, email, phone, favorite, owner: req.user._id });
	await contact.save();
	res.status(201).json(contact);
};

//DELETE /api/contacts/:id
const removeContact = async (req, res) => {
	const contact = await Contact.findByIdAndDelete(req.params.id);
	if (!contact) return res.status(404).json({ message: "Contact not found" });
	res.status(200).json({ message: "Contact deleted" });
};

//PUT /api/contacts/:id
const updateContact = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!contact) return res.status(404).json({ message: "Contact not found" });
	res.status(200).json(contact);
};

//PATCH /api/contacts/:id/favorite
const updateFavorite = async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) return res.status(404).json({ message: "Contact not found" });
	contact.favorite = !contact.favorite;
	await contact.save();
	res.status(200).json(contact);
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateFavorite,
};
