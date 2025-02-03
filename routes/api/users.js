const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const {
  updateAvatar,
  getCurrentUser,
  updateSubscription,
} = require("../../controllers/users");
const { signup, login, logout } = require("../../controllers/auth");
const router = express.Router();

//SIGNUP
router.post("/signup", signup);

//LOGIN
router.post("/login", login);

//LOGOUT
router.get("/logout", authMiddleware, logout);

//PATCH avatar
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

//GET /users/current
router.get("/current", authMiddleware, getCurrentUser);

//PATCH subscription
router.patch("/", authMiddleware, updateSubscription);

module.exports = router;
