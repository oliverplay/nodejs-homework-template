"use strict";

var express = require("express");

var router = express.Router();

var constactsController = require("../../controllers");

var _require = require("../../helpers"),
    validateData = _require.validateData,
    checkBody = _require.checkBody;

router.get("/", constactsController.getContacts);
router.get("/:contactId", constactsController.getContact);
router.post("/", validateData, constactsController.addContact);
router["delete"]("/:contactId", constactsController.deleteContact);
router.put("/:contactId", checkBody, validateData, constactsController.updateContact);
module.exports = router;