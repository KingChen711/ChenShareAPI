const router = require('express').Router();
const fileController = require('../controllers/file');

const { uploadFile, deleteFile, downloadFile } = fileController;

router.post('/upload', uploadFile);
router.get('/download/:imageName', downloadFile);
router.delete('/delete', deleteFile);

module.exports = router;
