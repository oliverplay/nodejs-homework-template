const express = require('express')
const {
    signup,
    login
} = require('../../controllers')

const {authValidation} = require('../../utilities')
const {validateBody} = require("../../middleware")

const router = express.Router();

router.post('/signup',validateBody(authValidation), signup);
router.post('/login',validateBody(authValidation), login);
module.exports = router;
