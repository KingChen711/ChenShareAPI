const Comment = require('../models/comment');
const Post = require('../models/post');

exports.postComment = async (req, res) => {
  const { message, userId: creator, postId: post } = req.body;
  try {
    const newComment = new Comment({
      message,
      creator,
      post,
    });
    await newComment.save();

    const foundPost = await Post.findById(post);
    foundPost.comments = [...foundPost.comments, newComment];
    foundPost.save();
    res.status(200).json({ comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
