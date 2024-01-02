const express = require('express')
const {
    signup,
    login,
    getCurrent
} = require('../../controllers')

const {authValidation} = require('../../utilities')
const {validateBody, authantication} = require("../../middleware")

const router = express.Router();

router.post('/signup',validateBody(authValidation), signup);
router.post('/login',validateBody(authValidation), login);
router.get("/current", authantication, getCurrent);
module.exports = router;
