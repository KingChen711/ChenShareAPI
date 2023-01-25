const router = require('express').Router();
const authController = require('../controllers/auth');
const verifyToken = require('../middleware/auth');

const { login, getUser } = authController;

router.post('/login', login);

router.post('/get-user', verifyToken, getUser);

module.exports = router;
