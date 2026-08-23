const express = require('express');
const router = express.Router();

const { getresponse } = require('../services/service.gemini.js');

router.post('/chat',getresponse);

module.exports = router;