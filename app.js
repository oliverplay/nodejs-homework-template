const express = require('express');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI || 'mongodb+srv://sorintene:1234qwer@test-cluster.jnsni.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.connect(DB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


const app = express();

app.use(express.json());

// Register routes
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send({ message: 'Not Found' });
});

module.exports = app; // Export the app for use in server.js
