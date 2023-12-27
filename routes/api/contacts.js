const express = require('express')
const {    
  getAllContacts,
  getById,
  deleteContact,
  postContact,
  updateContact} = require('../../controllers')

const {bodyValidation, updateFavoriteValidation} = require('../../utilities')
const {validateBody} = require("../../middleware")

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getById)

router.post('/', validateBody(bodyValidation), postContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', validateBody(bodyValidation), updateContact)

router.patch('/:contactId/favorite', validateBody(updateFavoriteValidation), updateContact)

module.exports = router