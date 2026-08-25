const express = require('express');
const router = express.Router();
const {LoginUser} = require('../controllers/auth.controller.js');
const {RegisterUser} = require('../controllers/auth.controller.js');

router.post('/login',LoginUser);
router.post('/register',RegisterUser);

module.exports = router;