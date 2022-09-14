const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profile_picture: {
      type: String,
    },
    views_count: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Onaylama İşlemi - isVerified: false,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
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
