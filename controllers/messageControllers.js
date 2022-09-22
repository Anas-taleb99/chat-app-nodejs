const Message = require("../models/messageModel");
const catchAsync = require("../utils/catchAsync");

exports.addMessage = catchAsync(async (req, res) => {

  const { from, to, message } = req.body;
  const data = await Message.create({
    message: { text: message },
    users: [from, to],
    sender: from
  })

  res.status(200).json({
    msg: "Message Added successfully."
  })
});

exports.getAllMessage = catchAsync(async (req, res, next) => {
  const { from, to } = await req.body;
  const messages = await Message.find({
    users: {
      $all: [from, to]
    },
  }).sort({ updatedAt: 1 });

  const projectMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }
  })
  res.status(200).json(projectMessages);
})