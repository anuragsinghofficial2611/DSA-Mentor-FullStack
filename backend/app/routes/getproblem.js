const express = require('express');
const router = express.Router();

const { getProblem } = require('../providers/leetcode.provider.js');

router.get(`/:problemnumber`,async (req,res) => {
    const problemnumber = req.params.problemnumber;
    const problem = await getProblem(problemnumber);
    res.json({
        success: true,
        data: problem
    });
});

module.exports = router;