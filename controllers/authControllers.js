const jwt = require('jsonwebtoken');
const Jimp = require("jimp");
const gravatar = require("gravatar");
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require("fs/promises");
const { catchAsync } = require('../utilities');
const { User } = require('../models/users');
const { httpError } = require('../utilities');
const { SECRET_WORD } = process.env;

exports.signup = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user) throw httpError(409, 'Email in use');
    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
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


exports.getCurrent = catchAsync(async (req, res) => {
  const { email, subscription } = await req.user;

  res.json({ email, subscription });
});

exports.logout = catchAsync(async (req, res) => {
  const { _id } = await req.user;
  console.log('User ID:', _id);
  await User.findByIdAndUpdate(_id, {token: null});
  res.status(204).json();
});

exports.updateSubscription = catchAsync(async (req, res) => {
  const { _id } = await req.user;
  const { subscription } = await req.body;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw httpError(400, "Invalid subscription");
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {subscription},
    {new: true}
  );

  if (!updatedUser) {
    throw httpError(404, "Not found");
  }

  res.status(201).json('Subscription is updated!');
});

const avatarsDir = path.join(__dirname, "../", "public", "avatars");


exports.updateAvatar = catchAsync(async (req, res) => {
  if (!req.file) {
    throw httpError(400, "File upload error");
  }
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  await image.contain(250, 250);
  await image.writeAsync(resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
 });


//  const updateAvatar = async (req, res) => {
//   const filedata = req.file;
//   if (!filedata) {
//     throw HttpError(400, "File upload error");
//   }

//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(avatarsDir, filename);
//   await fs.rename(tempUpload, resultUpload);

//   const image = await Jimp.read(resultUpload);
//   await image.contain(250, 250);
//   await image.writeAsync(resultUpload);

//   const avatarURL = path.join("avatars", filename);
//   await User.findByIdAndUpdate(_id, { avatarURL });
//   res.json({ avatarURL });
// };