const mongoose = require('mongoose');
const validator = require('validator');

const parklotSchema = new mongoose.Schema({
    lotid: { type: Number, required: true, unique:true},
    latitude: { 
        type: String, required: true,
        validate(value) {
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    longitude: { 
        type: String, required: true,
        validate(value) {
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    }
},{
    timestamps: true
});


parklotSchema.statics.create = function(payload){
    const park = new this(payload);

    return park.save();
}
parklotSchema.statics.findAll = function(){
    return this.find({});
}
parklotSchema.statics.findOneByParkno = function(lot){
    return this.findOne({ lotid : lot });
    // position은 사용자의 좌표를 바로 입력하면 안됨
    // 좌표에 해당하는 격자의 위치정보로 바꾸어주는 함수 필요
}
/*
parklotSchema.ststics.findOneById = function(id){
    return this.findOne({_id: id});
}
*/
parklotSchema.statics.updateByParkno = function(lot, payload){
    return this.findOneAndUpdate({lotid: lot}, payload, {new: true});
}
parklotSchema.statics.deleteByParkno = function(lot){
    return this.remove({lotid: lot});
}

parklotSchema.statics.findOneById = function(id){
    console.log(id);

    return this.findOne({_id: id});
}
parklotSchema.statics.updateById = function(id, payload){
    return this.findOneAndUpdate({_id: id},{$set: payload}, {new: true});
}
parklotSchema.statics.deleteById = function(id){
    return this.remove({_id: id});
}



module.exports = mongoose.model('Parklot',parklotSchema);