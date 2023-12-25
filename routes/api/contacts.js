const express = require('express')
const {    
  getAllContacts,
  getById,
  deleteContact,
  postContact,
  putContact} = require('../../controllers')

const {validation} = require('../../utilities')
const {validateBody} = require("../../middleware")

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getById)

router.post('/', validateBody(validation), postContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', validateBody(validation), putContact)

module.exports = router

