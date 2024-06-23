import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { signupUser, loginUser, logoutUser, getCurrentUsers, updateUserSubscription, updateAvatar, verifyEmail, resendVerifyEmail} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

router.post("/signup", ctrlWrapper(signupUser));

router.post("/login", ctrlWrapper(loginUser));

router.get("/logout", authenticateToken, ctrlWrapper(logoutUser));

router.get("/current", authenticateToken, ctrlWrapper(getCurrentUsers));

router.patch("/", authenticateToken, ctrlWrapper(updateUserSubscription));

//prettier-ignore
router.patch("/avatars", authenticateToken, upload.single("avatar"), ctrlWrapper(updateAvatar));

export { router };
