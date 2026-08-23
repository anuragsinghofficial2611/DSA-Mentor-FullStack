const express = require('express');
const router = express.Router();

const { geminiresponse } = require('../services/service.gemini.js');

router.post('/chat',geminiresponse);

module.exports = router;