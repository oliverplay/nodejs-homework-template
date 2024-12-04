const express = require("express");
const Joi = require("joi");
const router = express.Router();

let nanoid; // Variabila pentru nanoid

// Folosește import dinamic pentru nanoid
(async () => {
  const { nanoid: generatedNanoid } = await import("nanoid");
  nanoid = generatedNanoid;
})();

// Schema Joi pentru validarea contactelor
const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
});

// Exemplu de contacte
let contacts = [];

// Endpoint pentru obținerea contactelor
router.get("/", (req, res) => {
  res.json(contacts);
});

// Endpoint pentru adăugarea unui contact
router.post("/", (req, res) => {
  if (!nanoid) {
    return res.status(500).send("Internal server error: nanoid not initialized");
  }

  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, phone, email } = req.body;
  const id = nanoid();  // Folosim nanoid pentru a genera un ID unic

  const newContact = { id, name, phone, email };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Endpoint pentru ștergerea unui contact
router.delete("/:id", (req, res) => {
  const contactIndex = contacts.findIndex((contact) => contact.id === req.params.id);
  if (contactIndex === -1) return res.status(404).send("Contact not found");

  contacts.splice(contactIndex, 1);
  res.status(204).send();
});

module.exports = router;
