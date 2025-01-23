const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const auth = require("../../middlewares/auth"); // middleware pt autentificare
const upload = require("../../middlewares/upload"); // middleware pt upload
const fs = require("fs/promises");
const User = require("../../models/user"); // modelul User
require("dotenv").config();
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");

const router = express.Router();

const avatarsDir = path.join(__dirname, "../../public/avatars");

const { SECRET_KEY } = process.env; // cheie pt JWT

// validare cu Joi
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// validare cu Joi pt actualizare subscriere
const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

// PATCH /users/subscription
router.patch("/", auth, async (req, res, next) => {
  try {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { _id } = req.user; // ID utilizator autentificat
    const { subscription } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true } // return utilizator actualizat
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /users/avatars
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { path: tempPath, originalname } = req.file;

      // nume unic pentru avatar
      const filename = `${_id}-${Date.now()}-${originalname}`;
      const resultPath = path.join(avatarsDir, filename);

      // jimp
      const image = await Jimp.read(tempPath);
      await image.resize(250, 250).writeAsync(resultPath);
      await fs.unlink(tempPath);

      const avatarURL = `/avatars/${filename}`;
      await User.findByIdAndUpdate(_id, { avatarURL });

      res.status(200).json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

// GET /users/current - obtine datele pt utilizatorul curent
router.get("/current", auth, async (req, res, next) => {
  try {
    const { email, subscription } = req.user; // obtine datele pt utilizatorul autentificat
    res.status(200).json({ email, subscription }); // return răspuns de succes
  } catch (error) {
    next(error);
  }
});

// POST /users/signup
router.post("/signup", async (req, res, next) => {
  try {
    // valid body
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // verifică dacă emailul există deja
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);

    // criptare parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // creare utilizator nou
    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    // raspuns de succes
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /users/login
router.post("/login", async (req, res, next) => {
  try {
    // validare body
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // gaseste utilizatorul după email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // verifica parola
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // creează tokenul JWT
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // salveaza token in baza de date
    user.token = token;
    await user.save();

    // raspuns de succes
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /users/logout
router.post("/logout", auth, async (req, res, next) => {
  try {
    const { _id } = req.user; // utilizator autentificat

    // sterge token
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json(); // raspuns logout reușit
  } catch (error) {
    next(error);
  }
});

module.exports = router;
