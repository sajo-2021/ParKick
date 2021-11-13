// models/parklot.js
// lot : 주차장(클러스터링 알고리즘을 거쳐 만족하는 영역)

const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const ParklotSchema = new mongoose.Schema({
  lotid: { // 이름 
  // UI에서 주차장 좌표값이 아닌 주차장 이름 출력
    type: String, 
    required: true, 
    unique:true
  }, 
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
  comments: [{ // 특정 주차장의 댓글들
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment'
  }],
},
{
  timestamps: true
});

/*
    필드에 다른 오브젝트의 아이디를 지정할 수 있음
    { type: Schema.Types.ObjectId, ref:'스키마이름' }
    이러한 아이디에 대해 .populate(필드이름) 으로 해당 오브젝트를 불러올 수 있음    
*/
const Comment = require("comment");
Comment.findOne({parklot: parklot_id }).populate('comments').exec((err, data) => {
  // parklot_id : 특정 주차장 _id 입력받기
  console.log(data);
});

/////////////////////////////////////////////////////////
/// # 구상(구현X) : 세분화된 주차장 
/// area(서울) > section(동대문구) > location(서울시립대)  
///                                    
/// # 구현 : 섹션별 주차장 
/// section : 특정 좌표들로 구분                                 
/////////////////////////////////////////////////////////
const SectionSchema = new mongoose.Schema({
  sectid: {
    type: String, 
    unique:true
  },
  parklot: {
    type: [ParklotSchema]
  }
},
{
  timestamps: true
});

// 모델 생성
const Parklot = mongoose.model("Parklot", ParklotSchema);
const Section = mongoose.model("Section", SectionSchemaSchema);

module.exports = Parklot;
module.exports = Section;