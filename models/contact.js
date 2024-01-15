const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      match: (/^[0-9a-fA-F]{24}$/),
    },

    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  // { versionKey: false }
);

module.exports = mongoose.model("Contact", contactSchema);
