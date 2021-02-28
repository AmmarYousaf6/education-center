var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/authMiddleware');
var chatController = require('../controller/chatController');

router.get('/:sessionId',authMiddleware.validateToken,chatController.getChatMessages);
router.get('/',authMiddleware.validateToken,chatController.getLatestMessages);
router.post('/message',authMiddleware.validateToken,chatController.sendMessage);
router.get('/read/:messageId',authMiddleware.validateToken,chatController.markRead);

module.exports = router;
