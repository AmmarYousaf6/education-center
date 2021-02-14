var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var emailMiddleware = require('../middleware/sendEmail')
var authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
var upload = multer({ dest: './public/uploads/' });


router.get('/',authMiddleware.validateToken,userController.getUser);
router.get('/teachers',authMiddleware.validateToken,userController.getTeachers);
router.get('/profile/:userId',authMiddleware.validateToken,userController.getProfileById);
router.get('/activate/:userId',userController.activateUser);
router.post('/forgot-password',userController.forgotPassword, emailMiddleware.sendEmail);
router.post('/reset-password',userController.resetPassword);
router.put('/update-profile', authMiddleware.validateToken,upload.fields([{name: 'image', maxCount: 1}, {name: 'curriculum', maxCount: 1}]),userController.updateBasicProfile);

router.get('/my-invites',authMiddleware.validateToken,userController.myInvites);
router.get('/invite/:userId',authMiddleware.validateToken,userController.sendInvite);
router.post('/invite',authMiddleware.validateToken,userController.updateInvite);

//chat session
router.get('/session/:userId',authMiddleware.validateToken,userController.getUserConnectionSession);

//ratings
router.post('/ratings',authMiddleware.validateToken,userController.rateUser);
router.get('/ratings/:userId',authMiddleware.validateToken,userController.userRated);

router.get('/health',userController.health);
module.exports = router;
