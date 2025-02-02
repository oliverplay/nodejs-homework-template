const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../../models/user");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const { updateAvatar } = require("../../controllers/users");
const router = express.Router();

router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

//SIGNUP
router.post("/signup", async (req, res) => {
  const { error } = validationSchema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).send({ message: "Email in use ^_^" });
  const user = new User({ email, password });
  await user.save();
  res.status(201).send({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = validationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email not found ^_^" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log(
      password + " " + user.password + " ispasswordvalid: " + isPasswordValid
    );
    return res.status(401).json({ message: "Password is wrong ^_^" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

//LOGOUT
router.get("/logout", authMiddleware, async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.status(204).send();
});

//GET current user
router.get("/current", authMiddleware, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
});

//PATCH subscription
router.patch("/", authMiddleware, async (req, res) => {
  const { subscription } = req.body;
  if (!["starter", "pro", "business"].includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription type ^_^" });
  }
  req.user.subscription = subscription;
  await req.user.save();
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
});
module.exports = router;
