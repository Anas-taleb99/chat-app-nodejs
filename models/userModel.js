const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username field is required"],
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
