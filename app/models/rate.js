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

rateSchema.statics.create = function(){
    const rate = new this();
    rate.save();

    return rate._id;
}
rateSchema.statics.findAll = function(){
    return this.find({});
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

// statics 메소드로 작성해보자
rateSchema.statics.incLike = function(id){
    return this.findOneAndUpdate({_id: id}, {$inc: {like: 1}}, {new: true});
}
rateSchema.statics.incDislike = function(id){
    return this.findOneAndUpdate({_id: id}, {$inc: {dislike: 1}}, {new: true});
}
rateSchema.statics.decLike = function(id){
    return this.findOneAndUpdate({_id: id}, {$inc: {like: -1}}, {new: true});
}
rateSchema.statics.decDislike = function(id){
    return this.findOneAndUpdate({_id: id}, {$inc: {dislike: -1}}, {new: true});
}


// rateSchema의 인스턴스 메소드
// rateSchema.methods.incLike = function(){
//     return this.update({}, {$inc: {like: 1}}, {new: true});
// }
// rateSchema.methods.incDislike = function(){
//     return this.update({}, {$inc: {dislike: 1}}, {new: true});
// }
// rateSchema.methods.decLike = function(){
//     return this.update({}, {$inc: {like: -1}}, {new: true});
// }
// rateSchema.methods.decDislike = function(){
//     return this.update({}, {$inc: {dislike: -1}}, {new: true});
// }




module.exports = mongoose.model('Rate',rateSchema);