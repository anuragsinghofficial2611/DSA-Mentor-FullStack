const UserModel = require('../../models/user.model.js');
const ChatModel = require('../../models/chat.model.js');

const createChat = async() => {
    try{
        const { userId, title, problemId, hintlevel } = req.body;
        if(!userId) return res.status(400).json({message:"Userid is required"});
        const chat = await ChatModel.create({
            userId,
            title: title || "New Chat",
            problemId,
            hintLevel: hintlevel || 1
        });

        return res.status(201).json({
            message: "Chat created Successfully",
            chat
        })
    } catch(error){
        console.log(error);
    }
}

module.exports = { createChat };