import express from 'express';
import sgMail from '../../helpers/sendEmail.js';
import User from '../../models/user.js';
import { nanoid } from 'nanoid'; // Import nanoid

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use' });
    }

    // Create a verification token
    const verificationToken = nanoid();

    // Create a new user
    const user = await User.create({ email, password, verificationToken });

    // Send a verification email
    const verificationUrl = `http://localhost:3000/api/users/verify/${verificationToken}`;
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    };

    await sgMail.send(msg);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.verify) {
      return res.status(401).json({ message: 'Email not verified or invalid credentials' });
    }

    // Add logic for password validation and token generation
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
});

// Verify email endpoint
router.get('/verify/:verificationToken', async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    next(error);
  }
});

// Resend verification email endpoint
router.post('/verify', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Missing required field email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verify) {
      return res.status(400).json({ message: 'Verification has already been passed' });
    }

    const verificationUrl = `http://localhost:3000/api/users/verify/${user.verificationToken}`;
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: 'Resend Email Verification',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
});

export default router;
