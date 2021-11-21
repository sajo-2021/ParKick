// models/comment.js
// comment : 주차장에 대한 유저 댓글

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const CommentSchema = new mongoose.Schema({
  parklot: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parklot'
  }],
  user: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comment: {
    type: String,
    validate(value){
      if(value.length > 100){ // 100자 제한
        throw new Error("More than 100 characters cannot be entered.");
      }
    }
  }
  // saveDate: {
  //   type: Date,
  //   default: Date.now,
  // },
},
{
  timestamps:true
});

const Parklot = require("parklot");
const User = require("user");
Parklot.findOne({_id: parklot_id}).populate('parklot').exec((err, data) => {
  // parklot_id : 특정 주차장 _id 입력받기
  console.log(data);
});
User.findOne({_id: user_id }).populate('user').exec((err, data) => {
  // user_id : 특정 유저 _id 입력받기
  console.log(data);
});

// 모델 생성
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;