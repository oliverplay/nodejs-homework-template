import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import User from '../../models/user.js';
import authenticate from '../../middlewares/auth.js';
import dotenv from 'dotenv';
import sendEmail from '../../helpers/sendEmail.js';

dotenv.config();
const { JWT_SECRET } = process.env;

const router = express.Router();

// Register route
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
    });

    const verificationUrl = `http://localhost:3000/api/auth/verify/${verificationToken}`;
    await sendEmail({
      to: email,
      subject: 'Email Verification',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        verify: newUser.verify,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Verify email route
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

// Resend verification email
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

    const verificationUrl = `http://localhost:3000/api/auth/verify/${user.verificationToken}`;
    await sendEmail({
      to: email,
      subject: 'Resend Verification Email',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    });

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
});

// Login route
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.verify) {
      return res.status(401).json({
        message: 'Email or password is wrong, or email is not verified',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Logout route
router.post('/logout', authenticate, async (req, res, next) => {
  try {
    const { user } = req;
    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
