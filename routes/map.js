var express = require('express');
var router = express.Router();
var mapController = require('../controller/mapController');

/* GET home page. */
router.get('/search/:search',mapController.search);

module.exports = router;