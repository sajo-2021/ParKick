/*
    필드에 다른 오브젝트의 아이디를 지정할 수 있음
    { type: Schema.Types.ObjectId, ref:'스키마이름' }
    이러한 아이디에 대해 .populate(필드이름) 으로 해당 오브젝트를 불러올 수 있음    
*/
// models/zone.js
// zone : 주차공간(유저가 추천한 주차 가능 혹은 불가능 구역)

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const ZoneSchema = new mongoose.Schema({
  zoneid: { type: Number, required:true},//
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