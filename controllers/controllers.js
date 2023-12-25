const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  } = require("../models/contacts");

  const {catchAsync, HttpError} = require('../utilities')

exports.getAllContacts = catchAsync(async(req, res) =>{
    const allContacts = await listContacts();
    res.status(200).json(allContacts)
} )

exports.getById = catchAsync(async(req, res)=>{
    const {contactId} = req.params;
    const contact = await getContactById(contactId)
    if(!contact) throw new HttpError(400, 'Not found')
    res.status(200).json(contact)
})

exports.deleteContact = catchAsync(async (req, res)=>{
    const {contactId} = req.params;
    const deletedContact = await removeContact(contactId);
    if(!deletedContact) throw new HttpError(404, 'Not found')
    res.status(200).json({message: 'Contact was deleted!'})
})

exports.postContact = catchAsync(async(req, res)=>{
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
})

exports.putContact = catchAsync( async (req, res)=>{
    const {contactId} = req.params
    const updatedContact = await updateContact(contactId, req.body);
    if(!updateContact){
        throw new HttpError(400, 'Not found')
    }
    res.status(200).json(updatedContact);

})

  
