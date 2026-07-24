const express = require("express");
const chatController = require('../controller/chatController');

const router = express.Router();

router.post("/createChat", chatController.createChat);
router.post("/sendMessage", chatController.sendMessage);

module.exports = router;