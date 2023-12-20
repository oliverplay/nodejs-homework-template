const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBodyContact, validateId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", validateId, ctrl.getById);

router.post("/", validateBodyContact(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", validateId, ctrl.deleteById);

router.put(
  "/:contactId",
  validateId,
  validateBodyContact(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateBodyContact(schemas.updateFavoriteSchema),
  ctrl.updateStatus
);
module.exports = router;
