const ChatModel = require('../../models/chat.model.js');

const createChat = async (req, res) => {
    try {
        const {
            userId,
            title,
            problemId,
            hintLevel
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "userId and problemId are required"
            });
        }

        const chat = await ChatModel.create({
            userId,
            title: title || "New Chat",
            problemId,
            hintLevel: hintLevel || 1
        });

        return res.status(201).json({
            message: "Chat created successfully",
            chat
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { createChat };