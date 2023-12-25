const {httpError} = require('../utilities');

exports.validateBody = (validation) => {
  const fun = (req, res, next) => {
    const { error } = validation.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(httpError(400, "There are missing fields"));
      return;
    }
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return fun;
};

