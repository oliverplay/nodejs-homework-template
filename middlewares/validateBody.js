const { options } = require('../schemas/contacts');
const { HttpError } = require('../helpers')

const validateBody = schema => {
    const func = (req,res,next) => {
        const { error } = schema.validate(req.body, options);
        if(error) {
            
            const errorMessage = error.details[0].message;
        
            next(HttpError(400, errorMessage))

        }
        next();
    }

    return func;
}

module.exports = validateBody;