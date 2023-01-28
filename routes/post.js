const router = require('express').Router();
const postController = require('../controllers/post');
const verifyToken = require('../middleware/auth');

const {
  getPosts,
  createPost,
  getPostsByCategory,
  getPostDetail,
  getPostsBySearchQuery,
} = postController;

router.get('/all', getPosts);

router.get('/search/:searchQuery', getPostsBySearchQuery);

router.get('/category/:category', getPostsByCategory);

router.get('/:id', getPostDetail);

router.post('/create-post', verifyToken, createPost);

module.exports = router;
