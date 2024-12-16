const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const authenticate = require('../../middlewares/auth');
const User = require('../../models/user');

const router = express.Router();

// Validation schemas
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = await userSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = await userSchema.validateAsync(req.body);

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;
    await user.save();

    return res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Logout
router.get('/logout', authenticate, async (req, res) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Current User
router.get('/current', authenticate, (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
});

module.exports = router;
