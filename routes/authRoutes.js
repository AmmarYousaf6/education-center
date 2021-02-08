var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/authMiddleware');
var emailMiddleware = require('../middleware/sendEmail');
var authController = require('../controller/authController');


router.post('/signup',authMiddleware.validateSignup,authMiddleware.checkUserExists, authController.signUp,emailMiddleware.sendEmail);
router.post('/social-login',authMiddleware.validateSocialSignup,authMiddleware.checkUserExists, authController.socialSignUp,authController.socialLogin);
router.post('/login', authController.login);


module.exports = router;
