const router = require('express').Router();
const commentController = require('../controllers/comment');

const { postComment } = commentController;

router.post('/', postComment);

module.exports = router;
