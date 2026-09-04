const mongoose = require('mongoose');
const { z } = require('zod');

const userValidationSchema = z.object({
    username: z.string().min(3,'username should have atleast 3 characters'),
    email: z.string().email('format for email is not correct'),
    password: z.string().min(6,"Password should have at least 6 characters")
});

const userSchema = new mongoose.Schema({
    // username: z.string().min(3,'Username must be at least 3 characters')
    username: {
        type: String,
        unique: true,
        required: true
    }
     , 
    // email: z.string().email('invalid email')
    email : {
        type: String,
        unique: true,
        required: true
    }
    , 
    // password: z.string().min(6,'Password must be of 6 characters')
    password: {
        type: String,
        required:true
    }
})

const userModel = mongoose.model("User",userSchema);
module.exports = { userModel,userValidationSchema }