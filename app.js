const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");

const app = express();

app.use(cors());
app.use(express.json()); // Middleware pentru a procesa JSON în cererile HTTP

// Rutele contactelor
app.use("/api/contacts", contactsRouter);

module.exports = app;
