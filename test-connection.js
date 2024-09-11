const mongoose = require('mongoose');
require('dotenv').config();

const uriDb = process.env.DB_URL;

async function testConnection() {
  try {
    await mongoose.connect(uriDb, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Connection error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
