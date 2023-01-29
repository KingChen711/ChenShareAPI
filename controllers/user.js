const User = require('../models/user');
const Post = require('../models/post');

exports.getUserDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .select('createdPosts savedPosts name avatarUrl')
      .populate({
        path: 'createdPosts',
        select: 'imageUrl savingUsers _id',
        populate: {
          path: 'creator',
          select: 'avatarUrl name',
        },
      })
      .populate({
        path: 'savedPosts',
        select: 'imageUrl savingUsers _id',
        populate: {
          path: 'creator',
          select: 'avatarUrl name',
        },
      });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.savePost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const user = await User.findById(userId);
    user.savedPosts = [...user.savedPosts, postId];
    await user.save();

    const post = await Post.findById(postId);
    post.savingUsers = [...post.savingUsers, userId];
    await post.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Interval server error' });
  }
};
