<<<<<<< Updated upstream
import express from "express";
import logger from "morgan";
import cors from "cors";

import { router as contactsRouter } from "./routes/api/contactsRouter.js";
=======
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
>>>>>>> Stashed changes

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
<<<<<<< Updated upstream
=======
// перевіряє тіло запиту на content type application/json і повертає обєкт
>>>>>>> Stashed changes
app.use(express.json());

app.use("/api/contacts", contactsRouter);

<<<<<<< Updated upstream
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// module.exports = app;
export { app };
=======
app.use((request, response) => {
    response.status(404).json({ message: "Not found" });
});

// функція з 4 параметрами це функція обробник помилок (де перший параметр це помилка)
app.use((error, request, response, next) => {
    const { status = 500, message = "Server error" } = error;
    response.status(status).json({ message });
});

module.exports = app;
>>>>>>> Stashed changes
