const express = require('express');
const router = express.Router();
const { createChat } = require('../controllers/chats/createchat.js')
const { createMessage } = require('../controllers/chats/createMessage.js') 
const { getChat } = require('../controllers/chats/getChat.js');
const { getMessage } = require('../controllers/chats/getMessage.js');

router.post('/create',createChat);
router.post('/create/message',createMessage);
router.get('/getchat/:userId',getChat);
router.get('/getMessage/:chatId',getMessage);
 
module.exports = router;
