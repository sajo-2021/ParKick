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
rateSchema.statics.deleteById = function(id){
    return this.deleteOne({_id: id});
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