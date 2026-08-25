const UserModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({
            message: "Every field is required"
        })
        const findUser = await UserModel.find({ username });
        if (findUser) return res.status().json({
            message: "User already exists"
        })

        const hashedPassword = bcrypt.hash(password, 10);
        const user = UserModel.create({ username, email, hashedPassword });
        if (user) return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const LoginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Every field is required" });
        const user = await UserModel.find({ email })
        if (user) {
            const token = jwt.sign(
                user,
                process.env.JWT_SECRET
            )
            return res.status(200).json({
                message: "login sucessfull",
                token
            });
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}

module.exports = { LoginUser,RegisterUser }