var express = require('express');
var router = express.Router();
var mapController = require('../controller/mapController');

/* GET home page. */
router.get('/detail/:id',mapController.detail);

router.post('/nearby',mapController.fetchNearbyTeachers);


module.exports = router;