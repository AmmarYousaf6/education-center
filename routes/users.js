var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var emailMiddleware = require('../middleware/sendEmail')
var authMiddleware = require('../middleware/authMiddleware');

router.get('/',authMiddleware.validateToken,userController.getUser);
router.get('/teachers',authMiddleware.validateToken,userController.getTeachers);
router.get('/teachers/:userId',authMiddleware.validateToken,userController.getTeacherById);
router.get('/activate/:userId',userController.activateUser);
router.post('/forgot-password',userController.forgotPassword, emailMiddleware.sendEmail);
router.post('/reset-password',userController.resetPassword);
router.get('/health',userController.health);
router.put('/update-profile',authMiddleware.validateToken,userController.updateBasicProfile);


module.exports = router;
