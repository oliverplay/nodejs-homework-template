const mongoose = require("mongoose");
const app = require("./app");

require('dotenv').config(); // Ensure dotenv is configured

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST; // Make sure this matches your .env

mongoose
  .connect(uriDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(MAIN_PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
