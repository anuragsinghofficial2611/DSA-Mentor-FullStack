const express = require('express');
const router = express.Router();
const { createChat } = require('../controllers/chats/createchat.js')

router.post('/create',createChat);

module.exports = router;
