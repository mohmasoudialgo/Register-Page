const express = require('express');
const router = express.Router();

const aboutPage = require('./pages/about');
router.use('/',aboutPage);

const homePage = require('./pages/home');
router.use('/',homePage);

const registerPage = require('./auth/register');
router.use('/',registerPage);

const loginPage = require('./auth/login');
router.use('/',loginPage);

const passwordResetPage = require('./auth/passwordReset')
router.use('/',passwordResetPage);

const submitPassword = require('./auth/submitPassword')
router.use('/',submitPassword)

module.exports = router;