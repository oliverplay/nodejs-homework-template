const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
