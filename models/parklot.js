// models/parklot.js
// lot : 주차장(클러스터링 알고리즘을 거쳐 만족하는 영역)

const mongoose = require('mongoose');
const validator = require('validator');
var Rate = require('./rate');
var Comment = require('./comment');
var User = require('./user');

// 스키마 생성
const parklotSchema = new mongoose.Schema({
    lotid: {        // 주차장 고유번호
        type: Number, required: true, unique:true
    },
    lotname: {        // 주차장 고유이름
        type: String, required: true, unique:true
    },
    latitude: {     // 위도
        type: Number, required: true,
        validate(value) {
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    longitude: {    // 경도
        type: Number, required: true,
        validate(value) {
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    rate: {type: mongoose.Schema.Types.ObjectId, ref:'Rate' },
    ratelist: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments: [new mongoose.Schema({
        user: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, 
        comment: {type: mongoose.Schema.Types.ObjectId, ref:'Comment'},
    },{
        _id:false
    })]
},{
    timestamps: true
});


parklotSchema.statics.create = function(payload){
    var park = new this(payload);
    park.rate = Rate.create();

    return park.save();
    
}


parklotSchema.statics.findAll = function(){
    return this.find({})
        .populate("rate", "-_id like dislike")
        .populate({
            path: "comments", 
            populate: {path:"user", select: "-_id nickname"}
        }).populate({
            path: "comments",
            populate: {path: "comment", select: "-_id comment"}
        }).populate({
            path: "ratelist",
            select: "-_id userid nickname"
        });
}
parklotSchema.statics.findOneByParkno = function(lot){
    return this.findOne({ lotid : lot })
        .populate("rate", "-_id like dislike")
        .populate({
            path: "comments", 
            populate: {path:"user", select: "-_id nickname"}
        }).populate({
            path: "comments",
            populate: {path: "comment", select: "-_id comment"}
        }).populate({
            path: "ratelist",
            select: "-_id userid nickname"
        });
    // position은 유저 위치를 바로 입력하면 안됨
    // 좌표에 해당하는 격자의 위치정보로 바꾸어주는 함수 필요
}
parklotSchema.statics.findOneById = function(id){
    return this.findOne({_id: id})
        .populate("rate", "-_id like dislike")
        .populate({
            path: "comments", 
            populate: {path:"user", select: "-_id nickname"}})
        .populate({
            path: "comments",
            populate: {path: "comment", select: "-_id comment"}
        }).populate({
            path: "ratelist",
            select: "-_id userid nickname"
        });
}

parklotSchema.statics.deleteByParkno = function(lot){
    // 연결된 rate와 comment들을 먼저 삭제하는 동작이 필요함
    // 유저가 comment와 연결이 되어 있다면 거기서도 삭제를 해야 할텐데...
    // parklot의 comment에 존재하는 모든 유저에 대해 삭제?
    // 아니면 comment가 유저정보를 가지는 방식을 따를까?
    return this.deleteOne({lotid: lot});
}
parklotSchema.statics.deleteById = function(id){
    return this.deleteOne({_id: id});
}



module.exports = mongoose.model('Parklot',parklotSchema);