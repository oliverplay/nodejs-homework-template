import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

if (!DB_HOST) {
  throw new Error("DB_HOST environment variable is not defined.");
}

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Using our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(`Database connection failed. Error: ${err.message}`);
    process.exit(1); // Exit the process if unable to connect to the database
  });

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
