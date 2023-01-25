const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  category: {
    type: String,
    require: true,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    default:[]
  },
  imageUrl: {
    type: String,
    require: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Post', postsSchema);
