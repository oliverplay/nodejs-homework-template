const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose
const contactsRouter = require('./routes/api/contacts');
const errorHandler = require('./helpers/errorHandler'); // Importing the error handler

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/db-contacts?retryWrites=true&w=majority'; // Replace with your actual MongoDB URL

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  });

// Routes setup
app.use('/api/contacts', contactsRouter);

// 404 error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
