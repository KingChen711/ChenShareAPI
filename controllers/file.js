const fs = require('fs');
const deleteFile = require('../utils/deleteFile');

exports.uploadFile = (req, res) => {
  res.status(200).json({ imagePath: req.file.path });
};

exports.deleteFile = async (req, res) => {
  const { filePath } = req.body;
  deleteFile(filePath);
  res.status(200).json({ message: 'remove successfully!' });
};
