  
const Contact = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers')


const listContacts = async (req, res) => {
   
  const contacts = await Contact.find();
  res.json(contacts)
      
  }


  const getContactById = async (req, res) => {
   
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
  
    if (!contact) {
      throw HttpError(404, 'Not found')
        
    } 
  
    res.json( contact )
    
  }

  const addContact= async (req, res) => {
     
    const contact = await Contact.create(req.body);
      if(!contact) {
        throw HttpError(400, "The contact is in the contact list");
      }
  
    res.status(201).json(contact)

  }

  const removeContact = async (req, res) => {
   
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId)
  
    if (!contact) {
      throw HttpError(404, 'Not found')
    } 
  
    res.json({message: "contact deleted"} )
  
  }

  const updateContact = async (req, res) => {
      
    const { contactId } = req.params;
   
   
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  
    if (!contact) {
      throw HttpError(404, 'Not found')
    } 
  
    res.json(contact)
  
  }

  const updateFavorite = async (req, res) => {
      
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
   
    if (!contact) {
      
      throw HttpError(404, 'Not found')
    } 
  
    res.json(contact)
  
  }

  module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
  }


