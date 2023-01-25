const Post = require('../models/post.js');
const User = require('../models/user.js');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .select('imageUrl creator _id')
      .populate('creator', 'name avatarUrl');
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.find({ category })
      .select('imageUrl creator _id')
      .populate('creator', 'name avatarUrl');
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  const { type } = req.params;
  const fieldOfRequestPosts = `${type}Posts`; //createdPosts or savedPosts
  try {
    const user = await User.findById(req.userId)
      .select(fieldOfRequestPosts)
      .populate({
        path: fieldOfRequestPosts,
        select: 'imageUrl _id',
        populate: {
          path: 'creator',
          select: 'name avatarUrl',
        },
      });

    res.status(200).json({ success: true, posts: user[fieldOfRequestPosts] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, message, category, imageUrl } = req.body;

  try {
    const newPost = new Post({
      title,
      message,
      category,
      imageUrl,
      creator: req.userId,
    });
    await newPost.save();

    const user = await User.findById(req.userId);
    user.createdPosts = [...user.createdPosts, newPost._id];
    await user.save();

    res.status(200).json({ post: newPost });
  } catch (err) {
    console.error(err);
  }
};
