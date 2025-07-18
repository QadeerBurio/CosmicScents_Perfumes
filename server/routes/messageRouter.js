const express = require("express");
const router = express.Router();

const {
  sendMessage,
  deleteMessage,
  getAllMessages,
} = require("../controller/messageController");

const { loginCheck, isAuth, isAdmin } = require("../middleware/auth");

// Public route
router.post("/send", sendMessage);

// Admin-only routes
router.get("/admin/messages", loginCheck, isAuth, isAdmin, getAllMessages);
router.delete("/admin/delete/:id", loginCheck, isAuth, isAdmin, deleteMessage);

module.exports = router;
