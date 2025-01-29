const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Set the contact name"],
	},
	email: {
		type: String,
		required: [true, "Set the contact email"],
	},
	phone: {
		type: String,
		required: [true, "Set the contact phone"],
	},
	favorite: {
		type: Boolean,
		default: false,
	},
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
