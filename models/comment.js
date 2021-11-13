// models/comment.js
// comment : 주차장에 대한 유저 댓글

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const CommentSchema = new mongoose.Schema({
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

// 모델 생성
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;