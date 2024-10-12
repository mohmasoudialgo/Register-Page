const express = require('express');
const router = express.Router();
const {loginProcess} = require ('./../../middleware/loginProcess');

router.post('/login',loginProcess);

router.get('/login', (req, res) => {
    const message = req.flash('message'); 
    res.render('login', { message });
});


module.exports = router;