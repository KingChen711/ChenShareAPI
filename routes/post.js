const router = require('express').Router();
const postController = require('../controllers/post');
const verifyToken = require('../middleware/auth');

const { getPosts, createPost, getPostsByCategory, getPostsByUser } =
  postController;

router.get('/all', getPosts);

router.get('/user/:type', verifyToken, getPostsByUser);

router.get('/category/:category', getPostsByCategory);

router.post('/create-post', verifyToken, createPost);

module.exports = router;
