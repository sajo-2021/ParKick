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
    if(park)
        park.rate = Rate.create();

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
parklotSchema.statics.findOneById = function(id){
    return this.findOne({_id: id})
        .populate("rate", "like dislike")
        .populate({
            path: "comments", 
            populate: {path:"user", select: "nickname"}})
        .populate({
            path: "comments",
            populate: {path: "comment", select: "comment"}
        });
}

parklotSchema.statics.deleteByParkno = function(lot){
    // 연결된 rate와 comment들을 먼저 삭제하는 동작이 필요함
    // 유저가 comment와 연결이 되어 있다면 거기서도 삭제를 해야 할텐데...
    // parklot의 comment에 존재하는 모든 유저에 대해 삭제?
    // 아니면 comment가 유저정보를 가지는 방식을 따를까?
    return this.remove({lotid: lot});
}
parklotSchema.statics.deleteById = function(id){
    return this.remove({_id: id});
}



parklotSchema.methods.addComment = function(user, comment){
    User.findOneById(user).then(user => {
        if(!user) throw new Error('User id is Unavailable!');
        user.mycomments.push(com._id);
    });
    var com = new Comment(comment);
    com.save();
    this.comments.push({user:user, comment: com._id});
    
    return this.save();
}

parklotSchema.methods.updateComment = function(commentid, edit){
    Comment.findeOneById(commentid).then(comment => {
        if(!comment) throw new Error('Comment id is Unavailable');
        comment.comment = edit;
        console.log(comment);
        comment.save();
    });

    return this.save();
}



module.exports = mongoose.model('Parklot',parklotSchema);