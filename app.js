import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/api/contacts.js"; // Use ESM import for routes

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Handle other errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app; // Use default export
