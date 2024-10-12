const express = require('express');
const router = express.Router();
const {sendResetPasswordEmail} = require('./../../middleware/passwordReset');

router.post('/password-reset', sendResetPasswordEmail);


router.get('/password_reset', (req, res) => {
    const message = req.flash('message'); 
    res.render('passwordReset', { message });
});


module.exports = router;