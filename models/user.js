const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  email: {
    require: true,
    type: String,
  },
  name: {
    require: true,
    type: String,
  },
  avatarUrl: {
    type: String,
    default:
      'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg',
  },
  createdPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    default:[],
    ref: 'Post',
  },
  savedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    default:[],
    ref: 'Post',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('User', usersSchema);
