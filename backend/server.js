const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAi } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(express.json());

const genAi = new GoogleGenerativeAi(process.env.AI_API_KEY)

const model = genAi.getGenerativeModel({
    model : "gemini-2.5-flash"
});

app.post('/api/mentor', async (req,res) => {
    try{
        const { message } = req.body;
        if(!message) res.status(400).json({message: "Message is required"});

        const result = await model.generateContent(message);
        const response = result.response.text();
        
        res.json({
            response
        })

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