const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        text: {
            type: String,
            required: true,
            trim: true,
        },

        isRead: {
            type: Boolean,
            default: false,
        },

        replyTo: {
            text: { type: String },
            senderName: { type: String }
        },

        reactions: [
            {
                emoji: { type: String },
                senderId: { type: String }
            }
        ],

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);

const chatSchema = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
        ],

        messages: [messageSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("chat", chatSchema);