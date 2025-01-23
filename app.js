import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import contactsRouter from './routes/api/contacts.js';
import usersRouter from './routes/api/users.js';
import authRouter from './routes/api/auth.js';

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection URI
const DB_URI = process.env.DB_URI;

if (!DB_URI || (!DB_URI.startsWith('mongodb://') && !DB_URI.startsWith('mongodb+srv://'))) {
  console.error('Invalid or missing DB_URI in environment variables.');
  process.exit(1);
}

// Configure Mongoose settings
mongoose.set('bufferCommands', false); // Disable buffering to prevent unexpected behavior

// MongoDB connection events
mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err.message));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI); // Remove deprecated options
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

const app = express();
app.use(express.json());

app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

// Log route registration for debugging
console.log('Registering routes...');
app.use('/api/contacts', contactsRouter);
console.log('Contacts route registered at /api/contacts');

app.use('/api/users', usersRouter);
console.log('Users route registered at /api/users');

app.use('/auth', authRouter);
console.log('Auth route registered at /auth');

// Middleware for handling 404 errors
app.use((req, res, next) => res.status(404).json({ message: 'Not Found' }));

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

export { app, connectDB };
