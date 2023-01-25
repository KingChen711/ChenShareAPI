const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  message:{
    type:String,
    require:true,
  },
  creator:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
  },
  likeCount:{
    type:Number,
    require:0,
    default:0
  },
  createdAt:{
    require:true,
    type: Date,
    default:new Date()
  }
})

module.exports = mongoose.model('Comment', commentsSchema)