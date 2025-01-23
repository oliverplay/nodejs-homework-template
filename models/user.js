import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null, // Allow null values
    required: function () {
      return !this.verify; // Required only if the user is not verified
    },
  },
});

const User = mongoose.model('User', userSchema);

export default User;
