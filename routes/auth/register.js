const express = require('express');
const {registerProcess, userSubmit} = require('./../../middleware/registerProcess');
const router = express.Router();

router.post('/register',registerProcess , userSubmit);

router.get('/register', (req, res) => {
    const message = req.flash('message'); 
    res.render('register', { message });
});
module.exports = router;
