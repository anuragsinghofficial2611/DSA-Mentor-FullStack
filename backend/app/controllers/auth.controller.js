    const { UserModel } = require('../models/user.model.js');
    const { userValidationSchema } = require('../models/user.model.js');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const AppError = require('../utils/apperror.js');

    const RegisterUser = async (req, res, next) => {
        try {
            const validation = userValidationSchema.safeParse(req.body);
            if (!validation.success) {
                // return res.status(400).json({
                //     message: "Validation failed",
                //     errors: validation.error.issues
                // });
                throw new AppError("Given data is not valid",400);
            }
            const { username, email, password } = req.body;


            // if (!username || !email || !password) {
                // return res.status(400).json({
                //     message: "Every field is required"
                // });
                // throw new AppError("Every Field is R")
            // }

            const findUser = await UserModel.findOne({ username,email });


            if (findUser) {
                // return res.status(409).json({
                //     message: "User already exists"
                // });
                throw new AppError("User already exists",409);
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
            // console.log(error);

            // return res.status(500).json({
            //     message: "Internal server error"
            // });
            next(error);
        }
    };


    const LoginUser = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                // return res.status(400).json({
                //     message: "Every field is required"
                // });
                throw new AppError("Every field is required",400);
            }

            const user = await UserModel.findOne({ email });

            if (!user) {
                // return res.status(404).json({
                //     message: "User not found"
                // });
                throw new AppError("User not found",404);
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordCorrect) {
                // return res.status(401).json({
                //     message: "Password did not match"
                // });
                throw new AppError("Password did not match",401);
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
            // console.log(error);

            // return res.status(500).json({
            //     message: "Internal server error"
            // });
            next(error);
        }
    };

    module.exports = {
        LoginUser,
        RegisterUser
    };