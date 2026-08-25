const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    }, title: {
        type: String,
        default: "New Chat",
    }, 
    problemId:{
        type: String,
    },
    hintLevel:{
        type: Number,
        default: 1
    }
})
mongoose.exports = mongoose.model("Chat",chatSchema);
