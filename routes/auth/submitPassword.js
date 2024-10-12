const express = require('express');
const router = express.Router();
const {updatePassword} = require('./../../middleware/submitPassword');

router.post('/password_reset/submit', updatePassword );

router.get('/password_reset/submit', (req, res) => {
    const message = req.flash('message'); 
    console.log(message);
    
    res.render('submitPassword', { message });
});


module.exports = router;
