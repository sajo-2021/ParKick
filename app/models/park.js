const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    park_no: { type: String, required: true},
    park_latitude: { type: String, required: true},
    park_longitude: { type: String, required: true}
});


parkSchema.statics.create = function(payload){
    const park = new this(payload)
    return park.save();
}
parkSchema.statics.findAll = function(){
    return this.find({});
}
parkSchema.statics.findOneByParkno = function(parkno){
    return this.findOne({ park_no : parkno });
    // position은 사용자의 좌표를 바로 입력하면 안됨
    // 좌표에 해당하는 격자의 위치정보로 바꾸어주는 함수 필요
}
parkSchema.statics.updateByParkno = function(parkno, payload){
    return this.findOneAndUpdate({park_no: parkno}, payload, {new: true});
}
parkSchema.statics.deleteByParkno = function(parkno){
    return this.remove({park_no: parkno});
}

module.exports = mongoose.model('Park',parkSchema);