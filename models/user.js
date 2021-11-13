// models/user.js
const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,   // 공백제거
    required: true, // id 없으면 db 저장X
  },
  pwd: {
    type: String,
    trim: true,   // 공백제거
    required: true, // id 없으면 db 저장X
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  nickname: {
    type: String,
  },
  // age: {
  //   type: Number,
  //   validate(value) {
  //     if (value < 0) {
  //       throw new Error("Age must be a postive number");
  //     }
  //   },
  // },
  email: {
    type: String,
    // required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
},
{
  timestamps:true
});

const Comment = require("comment");
Comment.findOne({user: user_id }).populate('comments').exec((err, data) => {
  // user_id : 특정 유저 _id 입력받기
  console.log(data);
});


// 모델 생성
const User = mongoose.model("User", UserSchema);

module.exports = User;