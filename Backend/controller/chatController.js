const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");
const notificationModel = require("../model/notificationModel");
const { getIo } = require("../socket");
const getClientUrl = require("../utils/getClientUrl");

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

        const { chatId, senderId, text } = req.body;
        console.log("BACKEND DEBUG: sendMessage request received:", { chatId, senderId, text });

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
            text
        });

        await chat.save();

        const populatedChat = await chatModel.populate(chat, {
            path: "messages.sender",
            select: "name email profileImage"
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

        try {
            const recipientId = chat.users.find((u) => u.toString() !== senderId.toString());
            if (recipientId) {
                const senderUser = await userModel.findById(senderId);
                const recipientUser = await userModel.findById(recipientId);
                let snippet = text;
                if (text.startsWith("data:image/")) snippet = "sent you a photo 📷";
                else if (text.startsWith("data:video/")) snippet = "sent you a video 🎥";
                else if (text.startsWith("data:audio/")) snippet = "sent you a voice message 🎙️";
                else if (text.startsWith('{"type":"swapOffer"')) snippet = "sent you a swap proposal ⇄";
                else if (snippet.length > 60) snippet = snippet.substring(0, 60) + "...";

                const notification = new notificationModel({
                    recipient: recipientId,
                    sender: senderId,
                    type: "new_chat_message",
                    message: `${senderUser ? senderUser.name : "Someone"} sent you a message: ${snippet}`,
                    relatedId: chatId,
                });
                await notification.save();

                if (io) {
                    const populatedNotif = await notificationModel.findById(notification._id)
                        .populate("sender", "name profileImage");
                    io.to(recipientId.toString()).emit("newNotification", populatedNotif);
                }

                // Asynchronously send email notification
                if (recipientUser && recipientUser.email && senderUser) {
                    const clientUrl = getClientUrl(req);
                    const subject = "💬 New Message on SwapHub";
                    const html = `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <span style="font-size: 40px;">💬</span>
                            </div>
                            <h2 style="color: #1e293b; font-size: 20px; font-weight: 800; text-align: center; margin-top: 0; margin-bottom: 20px;">New Message Received</h2>
                            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                                Hello <strong>${recipientUser.name}</strong>,
                            </p>
                            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                                <strong>${senderUser.name}</strong> sent you a message:
                            </p>
                            <blockquote style="background-color: #f8fafc; border-left: 4px solid #2E7D32; padding: 12px 16px; margin: 20px 0; border-radius: 4px; font-style: italic; color: #334155; font-size: 14px;">
                                "${snippet}"
                            </blockquote>
                            <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                                <a href="${clientUrl}/chat" style="background-color: #2E7D32; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(46, 125, 50, 0.25);">Reply in Chat →</a>
                            </div>
                        </div>
                    `;
                    const sendEmail = require("../utils/sendEmail.js");
                    sendEmail(recipientUser.email, subject, html).catch((err) => {
                        console.error("SMTP error sending chat message email:", err.message);
                    });
                }
            }
        } catch (err) {
            console.error("Error creating chat message notification:", err);
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
            select: "name email profileImage"
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
            .populate("users", "name email profileImage phone location");

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

const reactToMessage = async (req, res) => {
    try {
        const { chatId, messageIndex, emoji, senderId } = req.body;

        if (!chatId || messageIndex === undefined || !senderId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const chat = await chatModel.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const msg = chat.messages[messageIndex];
        if (!msg) {
            return res.status(404).json({ message: "Message not found" });
        }

        if (!msg.reactions) {
            msg.reactions = [];
        }

        const existingReactionIndex = msg.reactions.findIndex((r) => r.senderId === senderId);

        if (existingReactionIndex > -1) {
            const currentReaction = msg.reactions[existingReactionIndex];
            if (currentReaction.emoji === emoji) {
                msg.reactions.splice(existingReactionIndex, 1);
            } else {
                currentReaction.emoji = emoji;
            }
        } else {
            msg.reactions.push({ emoji, senderId });
        }

        await chat.save();

        const io = getIo();
        if (io) {
            io.to(chatId).emit("messageReactionUpdated", {
                chatId,
                messageIndex,
                reactions: msg.reactions
            });
        }

        return res.status(200).json({
            message: "Reaction updated successfully",
            reactions: msg.reactions
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { createChat, sendMessage, getMessages, getMyChats, deleteMessage, updateMessage, deleteChat, markMessagesAsRead, reactToMessage };