const express = require('express');
const path = require('path');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const mongoose = require('mongoose');

// Database connection URI
const DB_URI = process.env.DB_URI || 'mongodb+srv://sorintene:1234qwer@test-cluster.jnsni.mongodb.net/db-contacts?retryWrites=true&w=majority';

// Function to establish the database connection
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if the database connection fails
  }
};

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Serve static files for avatars
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

// API routes
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

// Middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Connect to MongoDB when not in test mode
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Export the app instance for use in server.js and tests
module.exports = { app, connectDB };
