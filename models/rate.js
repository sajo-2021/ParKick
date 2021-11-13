// models/rate.js
// rate : like / unlike

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const RateSchema = new mongoose.Schema({
  like: {
    type: Number,
  },
  // like와 dislike 구분
  // like : +1
  // dislike : -1 
  // APIserver에서 각각 count 갯수 세기 용이
  dislike: {
    type: Number,
  },
  saveDate: {
    type: Date,
    default: Date.now,
  },
});

// 모델 생성
const Rate = mongoose.model("Rate", RateSchema);

module.exports = Rate;