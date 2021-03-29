var express = require('express');
var router = express.Router();
var settingController = require('../controller/settingController');

/* GET home page. */
router.get('/',settingController.allSettings);


module.exports = router;