const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_URL;

mongoose.connect(uriDb)
  .then(() => {
    app.listen(MAIN_PORT, () => {
      console.log(`Server is running on http://localhost:${MAIN_PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  });
