const express = require('express')
const {    
  getAllContacts,
  getById,
  deleteContact,
  postContact,
  updateContact,
} = require('../../controllers')

const {bodyValidation, updateFavoriteValidation} = require('../../utilities')
const {validateBody, isValidId, isEmptyReqBody} = require("../../middleware")

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId',isValidId, getById)

router.post('/', validateBody(bodyValidation), postContact)

router.delete('/:contactId',isValidId, deleteContact)

router.put('/:contactId',isValidId, isEmptyReqBody, validateBody(bodyValidation), updateContact)

router.patch('/:contactId/favorite',isValidId, validateBody(updateFavoriteValidation), updateContact)

module.exports = router