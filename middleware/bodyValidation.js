const HttpError = require('../utilities');

exports.validateBody = (validation) => {
   return (req, res, next) => {
        const { error } = validation.validate(req.body);

        if (Object.keys(req.body).length === 0) {
          next(HttpError(400, "missing fields"));
          return;
        }
        if (error) {
          return next(HttpError(400, error.message));
        }
        return next();
      };
};

