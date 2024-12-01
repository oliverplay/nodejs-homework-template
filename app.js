const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose');

// MongoDB connection
const DB_URI = 'mongodb+srv://sorintene:1234qwer@test-cluster.jnsni.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connection successful'))
  .catch(error => {
    console.error('Database connection error:', error.message);
    process.exit(1);
  });


const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
