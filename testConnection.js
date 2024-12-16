const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://sorintene:1234qwer@test-cluster.jnsni.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Database connection successful');
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Database connection error:', error.message);
  });
