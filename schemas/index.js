const contactsSchema = require("./contacts");
const statusSchema = require("./statusFavorite");
const updateSchema = require("./updateContact");
const {Contact} = require("./mongoModel");

module.exports= {
    contactsSchema,
    statusSchema,
    updateSchema,
    Contact,
};