const router = require('express').Router();
const userController = require('../controllers/user');
const verifyToken = require('../middleware/auth');

const { getUserDetail,savePost } = userController;

router.post('/save-post', savePost);

router.get('/:id', getUserDetail);

module.exports = router;
