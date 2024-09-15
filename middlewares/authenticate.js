const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  // If no bearer token is provided, return 401
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Unauthorized: No token provided"));
  }

  try {
    // Verify the token and extract the user ID
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    // Check if user exists, has a token, and matches the provided token
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Unauthorized: Invalid token"));
    }

    // Attach user object to the request and move to the next middleware
    req.user = user;
    next();
  } catch (error) {
    // In case of JWT verification errors or other exceptions
    return next(HttpError(401, "Unauthorized: Invalid token"));
  }
};

module.exports = authenticate;
