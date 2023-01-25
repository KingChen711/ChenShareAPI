const router = require('express').Router();
const postController = require('../controllers/post');
const verifyToken = require('../middleware/auth');

const { getPosts, createPost, getPostsByCategory } = postController;

router.get('/get-posts-by-category/:category', getPostsByCategory);

router.get('/get-posts', getPosts);

router.post('/create-post', verifyToken, createPost);

module.exports = router;
