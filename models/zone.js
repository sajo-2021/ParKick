// models/zone.js
// zone : 주차공간(유저가 추천한 주차 가능 혹은 불가능 구역)

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const ZoneSchema = new mongoose.Schema({
  suggest: {  // true : 주차공간 추천 / false : 주차금지공간 추천
    type:Boolean,
    default :true,
  },
  latitude: {   // 위도
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("A number less than 0 came in.");
      }
    },
  },
  longtitude: {   // 경도
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("A number less than 0 came in.");
      }
    },
  },
  // saveDate: {
  //   type: Date,
  //   default: Date.now,
  // },
},
{
  timestamps:true
});

// 모델 생성
const Zone = mongoose.model("Zone", ZoneSchema);

module.exports = Zone;

// 주차공간 데이터는 list 뭉텅이로 제공 -> 데이터 가공 필요