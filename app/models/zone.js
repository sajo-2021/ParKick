const mongoose = require('mongoose');
const validator = require('validator');

const zoneSchema = new mongoose.Schema({
    // zoneid: { type: Number, required:true},
    latitude: { 
        type: Number, required:true,
        validate(value){
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    longitude: {
        type: Number, required:true,
        validate(value){
            if(value < 0) throw new Error("A number less than 0 came in.");
        }
    },
    suggest: {
        type: Boolean, required: true,
        default: true
    }
    // 필드에 다른 오브젝트의 아이디를 지정할 수 있음
    // { type: Schema.Types.ObjectId, ref:'스키마이름' }
    // 이러한 아이디에 대해 .populate(필드이름) 으로 해당 오브젝트를 불러올 수 있음    
    },{
        timestamps:true
    });

zoneSchema.statics.create = function (payload) {
    const zone = new this(payload);

    return zone.save();
}
zoneSchema.statics.findAll = function(){
    return this.find({});
}
// zoneSchema.statics.findOneByZone = function(zone){
//     return this.findOne({zoneid: zone});
// }

// zoneSchema.statics.updateByZone = function(zone, payload){
//     return this.findOneAndUpdate({zoneid: zone}, {$set: payload}, {new: true});
// }
// zoneSchema.statics.deleteByZone = function(zone){
//     return this.remove({zoneid: zone});
// }

zoneSchema.statics.findOneById = function(id){
    return this.findOne({_id: id});
}
zoneSchema.statics.updateById = function(id, payload){
    return this.findOneAndUpdate({_id: id},{$set: payload}, {new: true});
}
zoneSchema.statics.deleteById = function(id){
    return this.deleteOne({_id: id});
}

module.exports = mongoose.model('Zone',zoneSchema);