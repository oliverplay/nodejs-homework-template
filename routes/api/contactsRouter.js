import express from "express";

const router = express.Router();

// GET: // http://localhost:3000/api/contacts
router.get("/", async (_req, res, next) => {
  res.json({ message: "template message" });
});

// GET: // http://localhost:3000/api/contacts/1
router.get("/:contactId", async (_req, res, next) => {
  res.json({ message: "template message" });
});

/* POST: // http://localhost:3000/api/contacts/ 
{
    "id": 3,
    "name": "Marvin Pacis",
    "email": "marvinpacis@example.com"
} 
*/
router.post("/", async (_req, res, next) => {
  res.json({ message: "template message" });
});

// DELETE: // http://localhost:3000/api/contacts/1
router.delete("/:contactId", async (_req, res, next) => {
  res.json({ message: "template message" });
});

/* PUT: // http://localhost:3000/api/contacts/1
{
    "name": "Joanna Shaw",
    "email": "shaw@example.com"
} 
*/
router.put("/:contactId", async (_req, res, next) => {
  res.json({ message: "template message" });
});

export { router };
