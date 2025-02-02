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
  const image = await Jimp.read(filePath);
  await image.resize(250, 250); // Redimensionare la 250x250
  await image.writeAsync(filePath);
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
