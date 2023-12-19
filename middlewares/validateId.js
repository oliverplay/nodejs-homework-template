const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const validateId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(HttpError(404, "not found"));
  }
  next();
};
module.exports = validateId;
