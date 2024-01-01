const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { catchAsync } = require('../utilities');
const { User } = require('../models/users');
const { httpError } = require('../utilities');
const { SECRET_WORD } = process.env;

exports.signup = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user) throw httpError(409, 'Email in use');
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
});

exports.login = catchAsync(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) throw httpError(401, 'Email or password is wrong');
  const comparedPassword = await bcrypt.compare(password, user.password);
  if(!comparedPassword) throw httpError(401, 'Email or password is wrong');

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "24h" } );

  await User.findByIdAndUpdate(user.id, { token });

  res.status(200).json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
});

