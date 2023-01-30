const Post = require('../models/post');
const fs = require('fs');
const path = require('path');

const deleteRedundantImages = async (req, res) => {
  try {
    const posts = await Post.find();
    const pathImages = posts.map((post) => post.imageUrl);

    fs.readdir('uploads', (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (!pathImages.includes(`uploads\\${file}`))
          fs.unlink(path.join('uploads', file), (err) => {
            if (err) throw err;
          });
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

module.exports = deleteRedundantImages;
