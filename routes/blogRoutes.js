var express = require('express');
var router = express.Router();
var blogsController = require('../controller/blogsController');

/* GET all blogs. */
router.get('/', blogsController.getBlogs);

router.get('/:id', blogsController.getBlogDetails);

router.get('/similar/:id',blogsController.getSimilarBlogs);

router.post('/comments',blogsController.addComment);

router.get('/comments/:id',blogsController.getComments);

module.exports = router;