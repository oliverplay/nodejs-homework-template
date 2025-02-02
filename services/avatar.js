// services/avatar.js
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const processAvatar = async (filePath) => {
  try {
    const image = await Jimp.read(filePath);
    await image.resize(250, 250).writeAsync(filePath);
  } catch (error) {
    throw new Error("Failed to process avatar with Jimp");
  }
};

const moveAvatar = async (filePath, fileName) => {
  const targetPath = path.join(__dirname, "..", "public", "avatars", fileName);
  await fs.promises.rename(filePath, targetPath);
  return `/avatars/${fileName}`;
};

module.exports = {
  upload,
  processAvatar,
  moveAvatar,
};
