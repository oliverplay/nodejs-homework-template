const express = require("express");
const router = express.Router();

const ctrl = require("../../controller/auth");
const { schemas } = require("../../models/user");
const { validateBody, authenticate, upload } = require("../../middlewares");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvater)

module.exports = router;