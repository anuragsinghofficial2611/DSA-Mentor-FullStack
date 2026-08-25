const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usernmae:{
        type: String,
        unique: true,
        required: true
    } , 
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: Number,
        required:true
    }
})

module.exports = mongoose.model("User",userSchema);