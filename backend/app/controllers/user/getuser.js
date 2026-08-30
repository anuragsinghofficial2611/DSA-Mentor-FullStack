const userModel = require('../../models/user.model.js')

const getUser = async (req,res) => {
    try{
        const userbase = await userModel.findById(req.user.id);
        return res.status(200).json({userbase});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = { getUser }