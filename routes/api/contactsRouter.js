import express from "express";

const router = express.Router();

router.get("/", async (_req, res, _next) => {
  res.json({ message: "template message" });
});

router.get("/:contactId", async (_req, res, _next) => {
  res.json({ message: "template message" });
});

router.post("/", async (_req, res, _next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (_req, res, _next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (_req, res, _next) => {
  res.json({ message: "template message" });
});

export default router;
