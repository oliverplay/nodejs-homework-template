const express = require("express");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema, updateSchema, statusSchema } = require("../../schemas");

const validateMiddleware = validation(contactsSchema);
const updateValidateMiddleware = validation(updateSchema);
const updateFavoriteMiddleware = validation(statusSchema);

const { contacts: ctrl } = require("../../controlers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  updateValidateMiddleware,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  updateFavoriteMiddleware,
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;