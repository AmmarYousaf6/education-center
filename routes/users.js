var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var emailMiddleware = require('../middleware/sendEmail')
var authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
var upload = multer({ dest: './public/uploads/' }); //destination folder for file upload


router.get('/',authMiddleware.validateToken,userController.getUser);
router.get('/teachers',authMiddleware.validateToken,userController.getTeachers);
router.get('/profile/:userId',authMiddleware.validateToken,userController.getProfileById);
router.get('/activate/:userId',userController.activateUser);
router.post('/forgot-password',userController.forgotPassword, emailMiddleware.sendEmail);
router.post('/reset-password',userController.resetPassword);
router.post('/update-teacher-profile', authMiddleware.validateToken , userController.uploadImageTeacher , userController.updateBasicProfile);
router.post('/update-profile-to-parent', authMiddleware.validateToken , userController.updateBasicProfileToParent);

router.post('/update-profile', authMiddleware.validateToken, userController.uploadImage ,userController.updateProfileDesc);
router.post('/update-profile-desc', authMiddleware.validateToken ,userController.updateProfileDesc);

router.post('/upload-image', authMiddleware.validateToken, userController.uploadImageOnly);

router.get('/children', authMiddleware.validateToken,userController.getChildren);
router.post('/children', authMiddleware.validateToken,userController.addChildren);
router.get('/children/:childId', authMiddleware.validateToken,userController.getChild);
router.put('/children', authMiddleware.validateToken,userController.updateChildren);
router.delete('/children/:childId', authMiddleware.validateToken,userController.removeChild);


router.get('/my-invites',authMiddleware.validateToken,userController.myInvites);
router.get('/my-pending-invites',authMiddleware.validateToken,userController.myPendingInvites);
router.get('/invite/:userId',authMiddleware.validateToken,userController.sendInvite);
router.post('/invite',authMiddleware.validateToken,userController.updateInvite);

//chat session
router.get('/session/:userId',authMiddleware.validateToken,userController.getUserConnectionSession);


//ratings
router.post('/ratings',authMiddleware.validateToken,userController.rateUser);
router.get('/ratings/:userId',authMiddleware.validateToken,userController.userRated);

router.get('/health',userController.health);

//latest teachers
router.get('/latest', userController.getLatestTeachers);

//unique Classes
router.get('/uniqueClasses', userController.uniqueClasses);

//unique Classes
router.get('/uniqueSubjects', userController.uniqueSubject);

//Search teachers
router.post('/search' ,userController.search);

//Views count 
router.post('/views' ,userController.addView);

module.exports = router;