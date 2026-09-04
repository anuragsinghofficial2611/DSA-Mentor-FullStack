    const { UserModel } = require('../models/user.model.js');
    const { userValidationSchema } = require('../models/user.model.js');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    const RegisterUser = async (req, res) => {
        try {
            const validation = userValidationSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: validation.error.issues
                });
            }
            const { username, email, password } = req.body;


            if (!username || !email || !password) {
                return res.status(400).json({
                    message: "Every field is required"
                });
            }

            const findUser = await UserModel.findOne({ username });

            if (findUser) {
                return res.status(409).json({
                    message: "User already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserModel.create({
                username,
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "User registered successfully"
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };


    const LoginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Every field is required"
                });
            }

            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Password did not match"
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                process.env.JWT_SECRET
            );

            return res.status(200).json({
                message: "Login successful",
                token,
                user
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };

    module.exports = {
        LoginUser,
        RegisterUser
    };