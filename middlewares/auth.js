const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized ^_^" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.token !== token)
      return res.status(401).json({ message: "Not authorized ^_^" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized ^_^" });
  }
};

module.exports = authMiddleware;
