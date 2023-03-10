const fs = require('fs');

exports.uploadFile = (req, res) => {
  res.status(200).json({ imagePath: req.file.path });
};

exports.deleteFile = async (req, res) => {
  const { filePath } = req.body;
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
  res.status(200).json({ message: 'remove successfully!' });
};

exports.downloadFile = async (req, res) => {
  const { imageName } = req.params;
  try {
    const file = `uploads/${imageName}`;
    res.download(file);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Interval server error' });
  }
};
