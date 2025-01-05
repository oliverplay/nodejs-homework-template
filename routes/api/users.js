const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const gravatar = require('gravatar');
const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const authenticate = require('../../middlewares/auth');
const User = require('../../models/user');

const router = express.Router(); // Declare the router object

// Validation schema
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body
    const { email, password } = await userSchema.validateAsync(req.body);
    console.log('Validated input:', { email, password }); // Log the validated input

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Invalid credentials'); // Log if credentials are invalid
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
    console.error('Error:', error.message); // Log validation or other errors
    return res.status(400).json({ message: error.message });
  }
});

// Multer configuration
const upload = multer({ dest: path.join(__dirname, '../../tmp') });

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = await userSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

    const newUser = await User.create({ email, password: hashedPassword, avatarURL });

    return res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription, avatarURL: newUser.avatarURL },
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

// Update Avatar
router.patch('/avatars', authenticate, upload.single('avatar'), async (req, res) => {
  try {
    console.log('File received:', req.file); // Log the received file object

    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { path: tempPath, originalname } = req.file; // req.file contains the uploaded file
    const { _id } = req.user;

    // Create a new avatar name to avoid conflicts
    const avatarName = `${_id}_${originalname}`;
    const avatarPath = path.join(__dirname, '../../public/avatars', avatarName);

    // Read and resize the image
    const image = await jimp.read(tempPath); // Read the uploaded file
    await image.resize(250, 250).writeAsync(avatarPath); // Resize and save the file to public folder

    // Remove the temporary file
    await fs.unlink(tempPath);

    // Update user with the new avatar URL
    const avatarURL = `/avatars/${avatarName}`;
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    console.error('Error processing avatar upload:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


module.exports = router; // Export the router object
