var express = require('express');
var router = express.Router();
var testimonialController = require('../controller/testimonialController');


router.get('/', testimonialController.getTestimonials);

module.exports = router;