const {Contact} = require("../models/contacts")

const {catchAsync, httpError} = require('../utilities')

exports.getAllContacts = catchAsync(async(req, res) =>{
    const allContacts = await Contact.find();
    res.status(200).json(allContacts)
} )

exports.getById = catchAsync(async(req, res)=>{
    const {contactId} = req.params;
    const contact = await Contact.findById(contactId);
    if(!contact) throw httpError(400, 'Not found')
    res.status(200).json(contact)
})

exports.deleteContact = catchAsync(async (req, res)=>{
    const {contactId} = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if(!deletedContact) throw httpError(404, 'Not found')
    res.status(200).json({message: 'Contact was deleted!'})
})

exports.postContact = catchAsync(async(req, res)=>{
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
})

exports.updateContact = catchAsync( async (req, res)=>{
    const {contactId} = req.params
    const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        {new: true}
    );
    if(!updatedContact){
        throw httpError(404, 'Not found')
    }
    res.status(200).json(updatedContact);

})
