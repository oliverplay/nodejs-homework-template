const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../schemas/user');
require('dotenv').config();
const auth = require("../../middlewares/auth");
const secret = process.env.SECRET;
const { validateToken, invalidatedTokens } = require("../../middlewares/token");
const gravatar = require('gravatar');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');

const tmpUpload = require('../../middlewares/multerTmp');
const publicUpload = require('../../middlewares/multerPublic');

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect login or password',
      data: 'Bad request',
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
});

router.get("/list", auth, (req, res) => {
  const { username } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
});

router.get("/logout", validateToken, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  invalidatedTokens.add(token);
  res.status(204).json({
    status: "success",
    code: 204,
    message: "Successfully logout",
    data: "success",
  });
});

router.get("/current", auth, async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/users", validateToken, auth, async (req, res, next) => {
  const validSubscriptions = ['starter', 'pro', 'business'];
  const { subscription } = req.body;

  if (!validSubscriptions.includes(subscription)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid subscription value',
      data: null,
    });
  }

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    user.subscription = subscription;
    await user.save();

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Subscription updated successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

// Avatars route for user registration
router.post("/registration", publicUpload.single('avatarURL'), async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    });
  }

  try {
    let avatarURL = '';
    if (req.file) {
      avatarURL = `/avatars/${req.file.filename}`;
    } else {
      avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'identicon' });
    }

    const newUser = new User({ username, email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
      },
    });
  } catch (error) {
    next(error);
  }
});

// Route to update user's avatar
router.patch('/avatars', auth, validateToken, tmpUpload.single('avatar'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No avatar file uploaded' });
    }

    // Process the uploaded avatar
    const imagePath = req.file.path;
    const avatarImage = await jimp.read(imagePath);
    await avatarImage.resize(250, 250);

    // Generate a unique filename for the avatar
    const avatarFilename = `${Date.now()}_${req.file.originalname}`;
    
    // Define the destination path for the avatar in the "public/avatars" folder
    const avatarPath = path.join('public', 'avatars', avatarFilename);

    // Write the resized avatar image to the destination path
    await avatarImage.writeAsync(avatarPath);

    // Update the user's avatarURL field in the database
    const userId = req.user._id; 
    const user = await User.findByIdAndUpdate(userId, { avatarURL: `/avatars/${avatarFilename}` }, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the temporary file
    await fs.unlink(imagePath);

    // Return the avatarURL in the response
    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
