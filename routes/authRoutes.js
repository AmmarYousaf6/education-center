var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/authMiddleware');
var emailMiddleware = require('../middleware/sendEmail');
var authController = require('../controller/authController');


router.post('/signup',authMiddleware.validateSignup, authController.signUp,emailMiddleware.sendEmail);
router.post('/login', authController.login);


module.exports = router;
