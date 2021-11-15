const mongoose = require('mongoose');
const validator = require('validator');
var Rate = require('./rate');
var Comment = require('./comment');
var User = require('./user');

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
    },
    rate: {type: mongoose.Schema.Types.ObjectId, ref:'Rate' },
    comments: [{
        user: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, 
        comment: {type: mongoose.Schema.Types.ObjectId, ref:'Comment'},
        default: {}
    }]
},{
    timestamps: true
});


parklotSchema.statics.create = function(payload){
    var park = new this(payload);
    var newrate = new Rate();
    newrate.save();

    park.rate = newrate._id;

    return park.save();
}
parklotSchema.statics.findAll = function(){
    return this.find({})
        .populate("rate", "like dislike")
        .populate({
            path: "comments", 
            populate: {path:"user", select: "nickname"}})
        .populate({
            path: "comments",
            populate: {path: "comment", select: "comment"}
        });
}
parklotSchema.statics.findOneByParkno = function(lot){
    return this.findOne({ lotid : lot })
        .populate("rate", "like dislike")
        .populate({
            path: "comments", 
            populate: {path:"user", select: "nickname"}})
        .populate({
            path: "comments",
            populate: {path: "comment", select: "comment"}
        });
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

parklotSchema.methods.addComment = function(user, comment){
    var com = new Comment(comment);
    com.save();
    this.comments.push({user:user, comment: com._id});
    User.findOneById(user).then(user => {
        user.addComment(com._id);
    });

    return this.save();
}



parklotSchema.methods.rateLike = function(){
    var rateid = this.rate;
    Rate.findOneAndUpdate({_id: rateid}, {$inc: {like:1}}, {new: true});
}
parklotSchema.methods.rateDislike= function(){

}


module.exports = mongoose.model('Parklot',parklotSchema);