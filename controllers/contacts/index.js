const { addContact } = require("./addContact");
const { deleteById } = require("./deleteById");
const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { updateById } = require("./updateById");
const { updateStatus } = require("./updateStatus");

module.exports = {
  addContact,
  deleteById,
  getAll,
  getById,
  updateById,
  updateStatus,
};
