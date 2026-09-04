const express = require('express');
const router = express.Router();
const { createChat } = require('../controllers/chats/createchat.js')
const { createMessage } = require('../controllers/chats/createMessage.js') 
const { getChat } = require('../controllers/chats/getChat.js');
const { getMessage } = require('../controllers/chats/getMessage.js');
const { getchatMiddleware } = require('../middlewares/chat.middleware.js');

router.post('/create',createChat);
router.post('/create/message',createMessage);
router.get('/getchat/',getchatMiddleware,getChat);
router.get('/getMessage/:chatId',getMessage);
 
module.exports = router;
