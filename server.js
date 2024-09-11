const mongoose = require("mongoose");
const app = require("./app");

require('dotenv').config();
console.log("Environment variables loaded"); // Debugging log

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

console.log(`Connecting to database at ${uriDb}`); // Debugging log

mongoose
  .connect(uriDb)
  .then(() => {
    console.log("Database connection successful"); // Debugging log
    app.listen(MAIN_PORT, () => {
      console.log(`Server is running on port ${MAIN_PORT}`); // Debugging log
    });
  })
  .catch((err) => {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
