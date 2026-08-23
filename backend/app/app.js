const express = require('express');
const app = express();
app.use(express.json());

const problemRouter = require('./routes/getproblem.js');

app.use(`/getproblem/`,problemRouter);

module.exports = app;
