const {isValidObjectId} = require("mongoose");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(isValidObjectId(id)) {
        next(console.error(400, `${id} is not valid id`))
    }
    next();
}

module.exports = isValidId;