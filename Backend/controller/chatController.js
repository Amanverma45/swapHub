const chatModel = require("../model/chatModel");
const { getIo } = require("../socket");

const createChat = async (req, res) => {
    try {

        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            return res.status(400).json({
                message: "Both users are required"
            });
        }

        const existingChat = await chatModel.findOne({
            users: { $all: [senderId, receiverId] }
        });

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const newChat = await chatModel.create({
            users: [senderId, receiverId],
            messages: []
        });

        return res.status(201).json(newChat);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const sendMessage = async (req, res) => {
    try {

        const { chatId, senderId, text, replyTo } = req.body;
        console.log("BACKEND DEBUG: sendMessage request received:", { chatId, senderId, text, replyTo });

        if (!chatId || !senderId || !text) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const chat = await chatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        chat.messages.push({
            sender: senderId,
            text,
            replyTo
        });

        await chat.save();

        const populatedChat = await chatModel.populate(chat, {
            path: "messages.sender",
            select: "name email"
        });
        const savedMessage = populatedChat.messages[populatedChat.messages.length - 1];

        const io = getIo();
        if (io) {
            console.log("BACKEND DEBUG: Emitting receiveMessage to room:", chatId, "message text:", text);
            io.to(chatId).emit("receiveMessage", {
                chatId,
                message: savedMessage
            });
        } else {
            console.error("BACKEND DEBUG ERROR: Socket.io instance is null or undefined!");
        }
        return res.status(200).json(chat);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getMessages = async (req, res) => {
    try {

        const { chatId } = req.params;
        const { userId } = req.query;

        const chat = await chatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        // Mark messages as read if userId is provided
        if (userId) {
            let updated = false;
            chat.messages.forEach((msg) => {
                if (msg.sender.toString() !== userId && !msg.isRead) {
                    msg.isRead = true;
                    updated = true;
                }
            });
            if (updated) {
                await chat.save();
                const io = getIo();
                if (io) {
                    io.to(chatId).emit("messagesRead", { chatId, readBy: userId });
                }
            }
        }

        const populatedChat = await chatModel.populate(chat, {
            path: "messages.sender",
            select: "name email"
        });

        return res.status(200).json(populatedChat.messages);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getMyChats = async (req, res) => {
    try {

        const { userId } = req.params;

        const chats = await chatModel
            .find({ users: userId })
            .populate("users", "name email");

        return res.status(200).json(chats);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const deleteMessage = async (req, res) => {
    try {

        const { chatId, messageIndex } = req.body;

        const chat = await chatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        chat.messages.splice(messageIndex, 1);

        await chat.save();

        const io = getIo();
        io.to(chatId).emit("messageDeleted", {
            chatId,
            messageIndex
        });

        return res.status(200).json({
            message: "Message deleted successfully",
            messages: chat.messages
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const updateMessage = async (req, res) => {
    try {

        const { chatId, messageIndex, text } = req.body;

        if (!chatId || messageIndex === undefined || !text) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const chat = await chatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        if (!chat.messages[messageIndex]) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        chat.messages[messageIndex].text = text;

        await chat.save();

        const io = getIo();
        io.to(chatId).emit("messageUpdated", {
            chatId,
            messageIndex,
            text
        });

        return res.status(200).json({
            message: "Message updated successfully",
            messages: chat.messages
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const deleteChat = async (req, res) => {
    try {

        const { chatId } = req.params;

        const chat = await chatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }

        chat.messages = [];
        await chat.save();

        const io = getIo();
        if (io) {
            io.to(chatId).emit("chatCleared", { chatId });
        }

        return res.status(200).json({
            message: "Chat cleared successfully",
            chat
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const markMessagesAsRead = async (req, res) => {
    try {
        const { chatId, userId } = req.body;

        if (!chatId || !userId) {
            return res.status(400).json({ message: "chatId and userId are required" });
        }

        const chat = await chatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        let updated = false;
        chat.messages.forEach((msg) => {
            if (msg.sender.toString() !== userId && !msg.isRead) {
                msg.isRead = true;
                updated = true;
            }
        });

        if (updated) {
            await chat.save();
            const io = getIo();
            if (io) {
                io.to(chatId).emit("messagesRead", { chatId, readBy: userId });
            }
        }

        return res.status(200).json({ message: "Messages marked as read successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports = { createChat, sendMessage, getMessages, getMyChats, deleteMessage, updateMessage, deleteChat, markMessagesAsRead };

