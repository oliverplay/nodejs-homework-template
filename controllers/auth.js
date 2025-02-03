const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//POST /users/login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email not found ^_^" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log(
      password + " " + user.password + " ispasswordvalid: " + isPasswordValid
    );
    return res.status(401).json({ message: "Password is wrong ^_^" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

//POST /users/signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: "Email in use ^_^" });
  const user = new User({ email, password });
  await user.save();
  res.status(201).json({
    // Schimbă .send() cu .json()
    message: "User created successfully ^_^", // Adaugă un mesaj pentru succes
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

//GET /users/logout
const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found ^_^" });
    }

    user.token = null;
    await user.save();

    res.status(200).json({ message: "Logged out successfully ^_^" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

module.exports = { login, signup, logout };
