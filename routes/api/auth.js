const express = require('express')
const {
    signup,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail
} = require('../../controllers')

const {authValidation, emailValidation} = require('../../utilities')
const {validateBody, authantication, uploadUserPhoto} = require("../../middleware")

const router = express.Router();

router.post('/register',validateBody(authValidation), signup);
router.post('/login',validateBody(authValidation), login);
router.post("/logout", authantication, logout);
router.get("/current", authantication, getCurrent);
router.patch("/", authantication, updateSubscription)

router.patch("/avatars", authantication, uploadUserPhoto.single("avatarURL"), updateAvatar)
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify",validateBody(emailValidation), resendVerifyEmail)
module.exports = router;
