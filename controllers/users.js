const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const User = require("../models/user");

const avatarsDir = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded ^_^" });
  }

  const { path: tempPath, originalname } = req.file;
  const { _id: userId } = req.user;
  const filename = `${userId}_${originalname}`;
  const resultPath = path.join(avatarsDir, filename);

  try {
    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(resultPath);
    await fs.unlink(tempPath);

    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(userId, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempPath);
    res.status(500).json({ message: "Server error ^_^" });
  }
};

module.exports = {
  updateAvatar,
};
