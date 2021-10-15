const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
    park_no: { type: String, required: true},
    park_latitude: { type: String, required: true},
    park_longitude: { type: String, required: true}
}, { timestamps:true });

mapSchema.static.findAll = function(){
    return this.find({});
}

mapSchema.static.findOneByPosition = function(position){
    return this.find({ position });
    // position은 사용자의 좌표를 바로 입력하면 안됨
    // 좌표에 해당하는 격자의 위치정보로 바꾸어주는 함수 필요
}

module.exports = mongoose.model('Map',mapSchema);