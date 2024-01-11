const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const updateById = require("./updateById");
const deleteById = require("./deleteById");
const updateStatus = require("./updateFavorite");


module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};