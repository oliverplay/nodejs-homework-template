// const multer = require("multer");
// // const path = require("path");
// const {httpError} = require('../utilities');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cbk) => {
//     cbk(null, 'public/avatars');
//   },
//   filename: (req, file, cbk) => {
//     cbk(null, file.originalname);
//   },
// });

// const multerFilter = (req, file, cbk) => {
//   if (file.mimetype.startsWith('avatar/')) {
//     cbk(null, true);
//   } else {
//     cbk(httpError(400, 'Please, upload images only!!'), false);
//   }
// };

// exports.uploadUserPhoto = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
// }).single('avatar');

const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadUserPhoto = multer({
  storage: multerConfig,
});

module.exports = uploadUserPhoto;


