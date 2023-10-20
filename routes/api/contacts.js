const express = require('express')
const contacts = require('../../models/contacts.json');
const router = express.Router();
const {v4} = require("uuid");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status:'success',
    code:200,
    data:{
      contacts,
    },
  });
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const result = await getContactById()
  if(!contact){
    res.status(400).json({message: "contact not found"})
  }
  res.json({
    status:'success',
    code:200,
    data:{result}
  })
})

router.post('/', async (req, res, next) => {
  const result = await addContact(body);
  if(!result){
    res.json({
      status: "Not Found",
      code: 404,
      message: "missing required name field",
    });
  }
  res.status(201).json({
    status:'success',
    code:201,
    data:{result}
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const result = await removeContact();
  if(!result){
    res.json({
      code: 404,
      message: "Not found"
    })
  }
  res.json({
    status:"success",
    code:200,
    message: "contact deleted",
    data:{result}
  })
  
})

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  // Call the updateContact function from the model to update the contact
  const result = await updateContact(contactId, req.body);

  // Check if the update was successful
  if (!result) {
    // If the update was not successful, respond with an error message
    res.json({
      status: "Not Found",
      code: 404,
      message: "an error occurred",
    });
  }

  // If the update was successful, respond with a success message and the updated data
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
});

module.exports = router
