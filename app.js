import express from "express";
import logger from "morgan";
import cors from "cors";
import router from "./routes/api/contactsRouter.js"; // Import your routes correctly
import { router as usersRouter } from "./routes/api/usersRouter.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Use proper route for contacts API
app.use("/api/contacts", router);

// http://localhost:3000/api/users
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export { app };
