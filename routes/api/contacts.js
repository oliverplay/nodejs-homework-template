const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

const { validateBody, isBody, isValidId } = require('../../middlewares')

const schemas = require('../../schemas/contacts')

router.get('/', ctrl.listContacts)

router.get('/:contactId', isValidId, ctrl.getContactById)

router.post('/', validateBody(schemas.schema), ctrl.addContact)

router.delete('/:contactId', isValidId, ctrl.removeContact)

router.put('/:contactId', isValidId, isBody('put'), validateBody(schemas.schema), ctrl.updateContact)

router.patch('/:contactId/favorite', isValidId, isBody('patch'), validateBody(schemas.schemaUpdateFavorite), ctrl.updateFavorite)

module.exports = router
