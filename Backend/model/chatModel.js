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

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
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