const ChatModel = require('../../models/chat.model.js');
const MessageModel = require('../../models/message.model.js');

const createMessage = async(req,res) => {
    try{
        const { chatId, role, content, hintlevel} = req.body;
        if(!chatId || !role || !content) return res.status(400).json({message: "Every field is required"});
        const message = MessageModel.create({chatId,role,content,hintlevel})
        return res.status(201).json({message:"message created in chat successfully"});
    } catch(error){
        console.log(error);
    }
    
}

module.exports = { createMessage };