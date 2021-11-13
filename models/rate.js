// models/rate.js
// rate : like / unlike

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const RateSchema = new mongoose.Schema({
  parklot: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parklot'
  }],
  user: [{  // 특정 유저의 rate 참여 여부 판단
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  like: {
    type: Number,
    validate(value){
      if(value < 0) throw new Error("like is not Negative");
    }
  },
  // like와 dislike 구분
  // like : 좋아요    dislike : 싫어요
  // APIserver에서 각각 count 갯수 세기 용이
  dislike: {
    type: Number,
    validate(value){
      if(value < 0) throw new Error("like is not Negative");
    }
  },
},
{
  timestamps: true
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
const Rate = mongoose.model("Rate", RateSchema);

module.exports = Rate;