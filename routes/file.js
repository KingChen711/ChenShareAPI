const router = require('express').Router();
const fileController = require('../controllers/file');
const deleteRedundantImages = require('../utils/deleteRedundantImages');

const { uploadFile, downloadFile, deleteFile } = fileController;

router.post('/upload', uploadFile);
router.get('/download/:imageName', downloadFile);
router.delete('/delete', deleteFile);
router.delete('/delete2', deleteRedundantImages);

module.exports = router;
