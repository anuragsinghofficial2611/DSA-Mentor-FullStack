const ChatModel = require('../../models/chat.model.js');

const getChat = async(req,res) => {
    try{
        const userId = req.user.id;
        // const { userId } = req.params;
        if(!userId) return res.status(400).json({message: "userId is required"});
        const findchat = await ChatModel.find({userId});
        if(findchat.length == 0) return res.status().json({message: "user doesn't have any chats yet"});
        res.status(200).json({findchat});
    } catch(error){
        console.log(error);
    }
}
module.exports = { getChat }