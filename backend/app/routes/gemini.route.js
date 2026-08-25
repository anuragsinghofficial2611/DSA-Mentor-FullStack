const express = require('express');
const router = express.Router();

const { getresponse } = require('../services/service.gemini.js');
const { getresopnsebyopenai } = require('../services/service.openai.js');
const { getresopnsebyxai, getresponsebyxai} = require('../services/service.xai.js');

// router.post('/chat',getresponse);
// router.post('/chat',getresponsebyopenai);
router.post('/chat',getresponsebyxai)

module.exports = router;