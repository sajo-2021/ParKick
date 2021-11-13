// models/parklot.js
// lot : 주차장(클러스터링 알고리즘을 거쳐 만족하는 영역)

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const ParklotSchema = new mongoose.Schema({
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
  saveDate: {
    type: Date,
    default: Date.now,
  },
});

// 모델 생성
const Parklot = mongoose.model("Parklot", ParklotSchema);

module.exports = Parklot;