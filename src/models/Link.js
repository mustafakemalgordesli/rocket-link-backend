const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    clicks_count: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("Link", LinkSchema);

module.exports = User;
