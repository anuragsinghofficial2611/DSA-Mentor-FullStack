const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/auth.route.js');
const chat = require('./routes/chats.route.js');
const user = require('./routes/user.route.js');

app.use(cors())
require('dotenv').config();
app.use(express.json());
    
const problemRouter = require('./routes/getproblem.js');
const AiRouter = require('./routes/gemini.route.js')

app.use('/v1/auth',auth);
app.use(`/getproblem/`,problemRouter);
app.use('/api/ai',AiRouter);
app.use('/chat/',chat)
app.use('/user/',user);

module.exports = app;
