const mongoose = require('mongoose');
const validator = require('validator');

const rateSchema = new mongoose.Schema({
    like: {
        type:Number, default: 0,
        validate(value){
            if(value < 0) throw new Error("like is not Negative");
        }
    },
    dislike: {
        type:Number, default: 0,
        validate(value){
            if(value < 0) throw new Error("dislike is not Negative");
        }
    }
}, {timestamps: true});

rateSchema.statics.create = function(payload){
    const rate = new this(payload);
    return rate.save();
}
rateSchema.statics.findAll = function(){
    return this.find({});
}
rateSchema.statics.findOneByParkno = function(lot){
    return this.findOne({lotid: lot});
}
rateSchema.statics.updateByParkno = function(lot, payload){
    return this.findOneAndUpdate({lotid:lot}, {$set: payload}, {new:true});
}
rateSchema.statics.deleteByParkno = function(lot){
    return this.remove({lotid:lot});
}

rateSchema.statics.findOneById = function(id){
    return this.findOne({_id: id});
}
rateSchema.statics.updateById = function(id, payload){
    return this.findOneAndUpdate({_id: id}, {$set: payload}, {new: true});
}
rateSchema.statics.deleteById = function(id){
    return this.remove({_id: id});
}





module.exports = mongoose.model('Rate',rateSchema);