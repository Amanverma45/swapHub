const express = require("express");
const notificationController = require("../controller/notificationController");
const authMiddleware = require("../authMiddleware");

const router = express.Router();

router.get("/notifications", authMiddleware, notificationController.getNotifications);
router.put("/notifications/:id/read", authMiddleware, notificationController.markAsRead);
router.put("/notifications/read-all", authMiddleware, notificationController.markAllAsRead);

module.exports = router;
