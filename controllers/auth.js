require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail } = require("../services/email");

// POST /users/login
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

  if (!user.verify) {
    return res
      .status(401)
      .json({ message: "Please verify your email first ^_^" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

// POST /users/signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(409).json({ message: "Email in use ^_^" });

  const verificationToken = uuidv4();

  const user = new User({ email, password, verificationToken });
  await user.save();

  await sendVerificationEmail(email, verificationToken);

  res.status(201).json({
    message: "User created successfully ^_^",
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

// GET /users/logout
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

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found ^.^" });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found ^_^" });
  }

  if (user.verify) {
    return res.status(400).json({ message: "Verification already done ^_^" });
  }

  await sendVerificationEmail(user.email, user.verificationToken);

  res.status(200).json({ message: "Verification email sent ^_^" });
};

module.exports = {
  login,
  signup,
  logout,
  verifyEmail,
  resendVerificationEmail,
};
