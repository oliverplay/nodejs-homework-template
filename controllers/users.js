const User = require("../models/user");
const { processAvatar, moveAvatar } = require("../services/avatar");
const authMiddleware = require("../middlewares/auth");

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded ^_^" });
    }

    await processAvatar(req.file.path);

    const avatarURL = await moveAvatar(req.file.path, req.file.filename);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL },
      { new: true }
    );
    res.status(200).json({ avatarURL });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update avatar ^_^", error: error.message });
  }
};

module.exports = {
  updateAvatar,
};
