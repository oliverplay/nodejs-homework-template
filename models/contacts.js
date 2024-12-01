const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: String,
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

const listContacts = async () => Contact.find();

const getContactById = async (contactId) => Contact.findById(contactId);

const addContact = async (contactData) => Contact.create(contactData);

const removeContact = async (contactId) => Contact.findByIdAndRemove(contactId);

const updateContact = async (contactId, updateData) => 
  Contact.findByIdAndUpdate(contactId, updateData, { new: true });

const updateFavorite = async (contactId, favorite) => 
  Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
