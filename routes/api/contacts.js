const express = require('express')
const {    
  getAllContacts,
  getById,
  deleteContact,
  postContact,
  putContact} = require('../../controllers')

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getById)

router.post('/',postContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId',putContact)

module.exports = router
