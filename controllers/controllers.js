const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  } = require("../models/contacts");

  const {catchAsync, HttpError, UserDataValidators} = require('../utilities')

exports.getAllContacts = catchAsync(async(req, res) =>{
    const allContacts = await listContacts();
    res.status(200).json(allContacts)
} )

exports.getById = catchAsync(async(req, res)=>{
    const {id} = req.params;
    const conatct = await getContactById(id)
    if(!conatct){
        throw new HttpError(400, 'Invalid id')
    }
    res.status(200).json(conatct)
})

exports.deleteContact = catchAsync(async (req, res)=>{
    const {id} = req.params;
    const deletedContact = await removeContact(id);
    if(!deletedContact){
        throw new HttpError(400, 'Invalid user')
    }
    res.status(200).json({message: 'Contact was deleted!'})
})

exports.postContact = catchAsync(async(req, res)=>{
    const data = UserDataValidators.createUserDataValidator(req.body)
    const newContact = await addContact(data);
    res.status(201).json(newContact);
})

exports.putContact = catchAsync( async (req, res)=>{
    const data = UserDataValidators.createUserDataValidator(req.body)
    const {id} = data
    const updatedContact = await updateContact(id, data);
    if(!updateContact){
        throw new HttpError(400, 'Invalid details')
    }
    res.status(201).json(updatedContact);

})

