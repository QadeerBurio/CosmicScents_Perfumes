const { Message } = require("../models/messageSchema");

const sendMessage = async (req, res) => {
  try {
    const { senderName, subject, message } = req.body;
    if (!senderName || !subject || !message) {
      return res.status(400).json({ error: "Please Fill Full Form!" });
    }

    const data = await Message.create({ senderName, subject, message });
    res.status(201).json({
      success: true,
      message: "Message Sent",
      data,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(400).json({ error: "Message Already Deleted!" });
    }

    await message.deleteOne();
    res.status(200).json({
      success: true,
      message: "Message Deleted",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

module.exports = {
  sendMessage,
  deleteMessage,
  getAllMessages,
};
