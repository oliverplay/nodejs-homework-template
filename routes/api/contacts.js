const express = require("express");
const contactSchema = require("../../schemas/contact");
const ctrl = require("../../controllers/contacts");

const validateContact = require("../../middlewares/validateContact");
const { required } = require("joi");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateContact(contactSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateContact(contactSchema), ctrl.updateById);

module.exports = router;
