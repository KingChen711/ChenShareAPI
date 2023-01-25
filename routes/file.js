const router = require('express').Router();
const fileController = require('../controllers/file');

const { uploadFile, deleteFile } = fileController;

router.post('/upload-file', uploadFile);
router.post('/delete-file', deleteFile);

module.exports = router;
