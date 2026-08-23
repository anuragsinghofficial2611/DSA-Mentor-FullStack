const app = require('./app/app')
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAi.getGenerativeModel({
    model: "gemini-3.6-flash"
});
console.log('request sent to ai')

app.post('/api/mentor', async (req,res) => {
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
})

app.listen(3000,() => {
    console.log('server is live at port 3000');
})