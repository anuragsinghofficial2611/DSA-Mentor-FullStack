const express = require('express');
const router = express.Router();
const {authUser} = require('../middlewares/auth.middleware.js')
const  { getUser } = require('../controllers/user/getuser.js')

router.get('/getuser',authUser,getUser);

module.exports = router;