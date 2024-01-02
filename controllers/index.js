const {getAllContacts,
    getById,
    deleteContact,
    postContact,
    updateContact} = require("./controllers")
const {
    signup,
    login,
    getCurrent
} = require('./authControllers')   

module.exports = {
    getAllContacts,
  getById,
  deleteContact,
  postContact,
  updateContact,
  signup,
  login,
  getCurrent
  }