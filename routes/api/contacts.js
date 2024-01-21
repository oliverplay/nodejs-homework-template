const express = require('express')
const router = express.Router();
const jsonParser = express.json();
const controllers = require('../../controllers/contactControllers');
const isValidId = require('../../services/isValidId');



router.get('/', controllers.getAll)

router.get('/:id', isValidId, controllers.getById)

router.post('/', jsonParser, controllers.add)

router.delete('/:id',isValidId, controllers.deleteById)

router.put('/:id',isValidId, jsonParser, controllers.put)

router.patch('/:id/favorite', isValidId, jsonParser, controllers.changeFavorite)



module.exports = router;