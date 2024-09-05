const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const DB_HOST = process.env.DB_HOST;

mongoose.connect(DB_HOST)
  .then(() => console.log('Database connection successful'))
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });

// Define routes here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
