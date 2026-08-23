const express = require('express');
const app = express();
app.use(express.json());

const problemRouter = require('./routes/getproblem.js');
const AiRouter = require('./routes/gemini.route.js')

app.use(`/getproblem/`,problemRouter);
app.use('/api/ai',AiRouter);

module.exports = app;
