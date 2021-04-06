var express = require('express');
var router = express.Router();
var mapController = require('../controller/mapController');

/* GET home page. */
router.get('/detail/:id',mapController.detail);

router.post('/nearby',mapController.fetchNearbyTeachers);

//For google maps
router.get('/places/:search',mapController.fetchGeocodes);

module.exports = router;