const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
