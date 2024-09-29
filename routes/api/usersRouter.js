import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { signupUser, loginUser, logoutUser, getCurrentUsers, updateUserSubscription} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = express.Router();

/* POST: // http://localhost:3000/api/users/signup
{
  "email": "valerie@mail.com",
  "password": "val12345"
}
*/
router.post("/signup", ctrlWrapper(signupUser));

/* POST: // http://localhost:3000/api/users/login
{
  "email": "valerie@mail.com",
  "password": "val12345"
}
*/
router.post("/login", ctrlWrapper(loginUser));

/* GET: // http://localhost:3000/api/users/logout */
router.get("/logout", authenticateToken, ctrlWrapper(logoutUser));

/* GET: // http://localhost:3000/api/users/current */
router.get("/current", authenticateToken, ctrlWrapper(getCurrentUsers));

/* PATCH: // http://localhost:3000/api/users/
{
    "subscription":"pro"
}
*/
router.patch("/", authenticateToken, ctrlWrapper(updateUserSubscription));
export { router };
