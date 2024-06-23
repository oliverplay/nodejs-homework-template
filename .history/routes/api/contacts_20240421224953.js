import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper";
// prettier-ignore
import { listContacts, getContactById, removeContact,addContact,updateContact } from "../../models/contacts";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export { router };
