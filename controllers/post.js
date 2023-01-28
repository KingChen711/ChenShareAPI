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

exports.getPostDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const foundPost = await Post.findById(id)
      .populate({
        path: 'creator',
        select: 'avatarUrl name',
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'creator',
          select: 'avatarUrl name',
        },
      });

    const samePosts = await Post.find({ category: foundPost.category })
      .select('imageUrl creator _id')
      .populate('creator', 'name avatarUrl');
    res.status(200).json({ post: foundPost, samePosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interval server error' });
  }
};

exports.getPostsBySearchQuery = async (req, res) => {
  const { searchQuery } = req.params;
  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { message: { $regex: searchQuery, $options: 'i' } },
      ],
    })
      .select('imageUrl creator _id')
      .populate('creator', 'name avatarUrl');
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interval server error' });
  }
};
