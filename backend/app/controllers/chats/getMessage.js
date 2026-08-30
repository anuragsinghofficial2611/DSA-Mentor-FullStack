const MessageModel = require('../../models/message.model.js');
const chatModel = require('../../models/chat.model.js');

const getMessage = async (req,res) => {
    try{
        const { chatId } = req.params;
        if(!chatId) return res.status(400).json({message: "chatId is required"});
        const message = await MessageModel.find({chatId});
        return res.status(200).json({message});
    } catch(error){
        console.log(error);
    }
}

module.exports = { getMessage }