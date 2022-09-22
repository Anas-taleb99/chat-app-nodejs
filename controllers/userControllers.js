const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user)
    return res
      .status(404)
      .json({ msg: "Incorrect username or password", status: false });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res
      .status(404)
      .json({ msg: "Incorrect username or password", status: false });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.setAvatar = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const avatarImage = req.body.image;
  const userData = await User.findByIdAndUpdate(
    userId,
    {
      isAvatarImageSet: true,
      avatarImage,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    isSet: userData.isAvatarImageSet,
    image: userData.avatarImage,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ _id: { $ne: req.params.id } }).select([
    "email",
    "username",
    "avatarImage",
    "_id",
  ]);
  res.status(200).json({
    status: "Success",
    users
  })
});
