const validateBody = require("./bodyValidation");
const isValidId = require('./idValidation');
const isEmptyReqBody = require('./emptyBodyValidation')
const authantication = require("./authantication")
const uploadUserPhoto = require("./upload")

module.exports =  {validateBody, isValidId, isEmptyReqBody, authantication, uploadUserPhoto};