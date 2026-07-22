const chatModel = require("../model/chatModel");

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

module.exports = {createChat};