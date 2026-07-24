const express = require("express");
const chatController = require('../controller/chatController');

const router = express.Router();

router.post("/createChat", chatController.createChat);
router.post("/sendMessage", chatController.sendMessage);
router.get("/getMessages/:chatId", chatController.getMessages);
router.get("/myChats/:userId", chatController.getMyChats);
router.delete("/deleteMessage", chatController.deleteMessage);
router.put("/updateMessage", chatController.updateMessage);
router.delete("/deleteChat/:chatId", chatController.deleteChat);

module.exports = router;