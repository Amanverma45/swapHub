const notificationModel = require("../model/notificationModel");

const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel.find({ recipient: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50)
            .populate("sender", "name profileImage");
        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await notificationModel.findOneAndUpdate(
            { _id: id, recipient: req.user.id },
            { isRead: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        return res.status(200).json({ message: "Notification marked as read", notification });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        await notificationModel.updateMany(
            { recipient: req.user.id, isRead: false },
            { isRead: true }
        );
        return res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const markByChatAsRead = async (req, res) => {
    try {
        const { chatId } = req.params;
        await notificationModel.updateMany(
            { recipient: req.user.id, relatedId: chatId, isRead: false },
            { isRead: true }
        );
        return res.status(200).json({ message: "Chat notifications marked as read" });
    } catch (error) {
        console.error("Error marking chat notifications as read:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    markByChatAsRead,
};
