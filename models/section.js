/////////////////////////////////////////////////////////
/// # 구상(구현X) : 세분화된 주차장 
/// area(서울) > section(동대문구) > location(서울시립대)  
///                                    
/// # 구현 : 섹션별 주차장 
/// section : 특정 좌표들로 구분                                 
/////////////////////////////////////////////////////////


// models/section.js
// section : 주차장 모음

const mongoose = require('mongoose');
const validator = require('validator');
var Parklot = require('./parklot');

// 스키마 생성
const sectionSchema = new mongoose.Schema({
    sectid: {        // 섹션 고유번호
        type: Number, required: true, unique:true
    },
    sectname: {        // 섹션 고유이름 ex) 서울시립대
        type: String, required: true, unique:true
    },
    latitude: {     // 기준 위도
        type: Number, required: true,
        validate(value) {
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    longitude: {    // 기준 경도
        type: Number, required: true,
        validate(value) {
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    parklot: {type: mongoose.Schema.Types.ObjectId, ref:'Parklot' }
},{
    timestamps: true
});


sectionSchema.statics.create = function(payload){
    var section = new this(payload);
    return section.save();    
}

sectionSchema.statics.findAll = function(){
    return this.find({}).populate("parklot", "-_id lotid lotname");
}



module.exports = mongoose.model('Section',sectionSchema);