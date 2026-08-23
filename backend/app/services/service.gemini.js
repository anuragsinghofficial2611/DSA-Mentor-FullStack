const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAi = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAi.getGenerativeModel({
    model: "gemini-3.6-flash"
});

const getresponse = async(req,res) => {
    try{
        const { message } = req.body;
        if(!message) {
            res.status(400).json({message: "Message is required"});
            return;
        }

        const result = await model.generateContent(message);
        const response = result.response.text();
        
        res.json({
            response
        })
        console.log('response sent from ai')
    } catch(error){
        console.log("error in the server" , error);
        res.status(500).json({
            error: "failed to genrate response from ai see the server console for error"
        })
    }
}

module.exports = { getresponse }