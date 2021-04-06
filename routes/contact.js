var express = require('express');
var router = express.Router();
var settingController = require('../controller/settingController');
var emailMiddleware = require('../middleware/sendEmail');

/* GET home page. */
router.post('/',emailMiddleware.sendCustomEmail);


module.exports = router;