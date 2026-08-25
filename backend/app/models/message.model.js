const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    chatId:{
        type: mongoose.model.Types.ObjectId,
        ref:"Chat",
        required:true,
        index:true
    },
    role: {
        type: String,
        enum: ["user","assistant"],
        required: true
    },
    content: {
        type: "String",
        required: true,
    }, 
    hintLevel: {
        type: Number
    }
})

module.exports = mongoose.model("Message",messageSchema);