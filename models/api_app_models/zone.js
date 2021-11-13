const mongoose = require('mongoose');
const validator = require('validator');

const zoneSchema = new mongoose.Schema({
    zoneid: { type: Number, required:true},
    latitude: { 
        type: String, required:true,
        validate(value){
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    longitude: {
        type: String, required:true,
        validate(value){
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    // 필드에 다른 오브젝트의 아이디를 지정할 수 있음
    // { type: Schema.Types.ObjectId, ref:'스키마이름' }
    // 이러한 아이디에 대해 .populate(필드이름) 으로 해당 오브젝트를 불러올 수 있음    
    },{
        timestamps:true
    });

zoneSchema.statics.findAll = function(){
    return this.find({});
}
zoneSchema.statics.findOneByPointno = function(id){
    return this.findOne({zoneid: id});
}
zoneSchema.statics.create = function (payload) {
    const zone = new this(payload);
    // 데이터가 통으로 전달되면 controller에서
    // 데이터를 가공하여 payload를 만들어 호출하라

    return zone.save();
}

zoneSchema.statics.updateByPointno = function(id, payload){
    return this.findOneAndUpdate({zoneid: id}, {$set: payload}, {new: true});
}

zoneSchema.statics.deleteByPointno = function(id){
    return this.remove({zoneid: id});
}

module.exports = mongoose.model('Zone',zoneSchema);