const bcrypt = require("bcrypt");

const User = require("../models/user");

async function register(req, res, next) {
  const { name, email, password } = req.body;
  try {
    /*-- Tworzymy kod aby nie powtarzał się ten sam email dla różnych ludzi --*/
    const user = await User.findOne({ email });

    if (user === null) {
      return restart.status(409).send({ message: "User already register" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ email, password: passwordHash });
    res.send("Register");
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      console.log("Email");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      console.log("Password");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    res.send("Login");
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
