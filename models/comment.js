const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Post',
  },
  likeCount: {
    type: Number,
    require: 0,
    default: 0,
  },
  createdAt: {
    require: true,
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Comment', commentsSchema);
