const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Onaylama İşlemi - isVerified: false,
    },
    profile_picture: {
      type: String,
    },
    views_count: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
