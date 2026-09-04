const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

const getchatMiddleware = async (req,res,next) => {
    try{
        const requestheader = req.headers.authorization;
        if(!requestheader) return res.status(401).json({message: "user is not authenticated"});
        const token = requestheader.split(" ")[1];
        if(!token) return res.status(401).json({message: "token not found"});
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports = { getchatMiddleware };