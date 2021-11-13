// models/parklot.js
// lot : 주차장(클러스터링 알고리즘을 거쳐 만족하는 영역)

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const ParklotSchema = new mongoose.Schema({
  lotid: { // 주차장이름, 추천한 주차공간을 좌표값이 아닌, 위치정보로 제공
    type: Number, 
    required: true, 
    unique:true
  },  // 수정하기
  latitude: {   // 위도
    type: String,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("A number less than 0 came in.");
      }
    },
  },
  longtitude: {   // 경도
    type: String,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("A number less than 0 came in.");
      }
    },
  },
  lotcomments: [{ // 특정 주차장의 댓글들
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment'
  }],
},
{
  timestamps: true
});

User.findOne({ name: 'zero' }).populate('bestFriend').exec((err, data) => {
  console.log(data);
});

// 모델 생성
const Parklot = mongoose.model("Parklot", ParklotSchema);

module.exports = Parklot;