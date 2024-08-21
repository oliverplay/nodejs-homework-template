const express = require("express");
const fs = require("fs");
const router = express.Router();

let contactsPath = "";

router.use((req, res, next) => {
  if (!contactsPath) {
    contactsPath = req.app.locals.contactsPath;
  }
  next();
});

router.get("/", (req, res, next) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
