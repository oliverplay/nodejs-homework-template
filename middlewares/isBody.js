const { HttpError } = require('../helpers')

const isBody = type => {
    const func = (req,res,next) => {
        
        if (Object.keys(req.body).length === 0) {

            let errorMessage = '';

            switch(type){
                case 'put':
                    errorMessage = "missing fields";
                    break;
                case 'patch':
                    errorMessage = "missing field favorite";
                    break;
                default: 
                    errorMessage = "empty object";
            }
            next(HttpError(400, errorMessage));
        }
        next();
    }

    return func;
}

module.exports = isBody;