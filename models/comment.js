// models/comment.js
// comment : 주차장에 대한 유저 댓글

const mongoose = require('mongoose');
const validator = require('validator');

// 스키마 생성
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        validate(value){ // 100자 제한
            if(value.length > 100) 
                throw new Error("More than 100 characters cannot be entered.");
        }
    }
},{
    timestamps:true
});


commentSchema.statics.create = function(payload) {
    const comment = new this(payload)
    return comment.save();
}
commentSchema.statics.findAll = function(){
    return this.find({});
}
commentSchema.statics.findOneById = function(id){
    return this.findOne({_id: id});
}
commentSchema.statics.deleteById = function(id){
    return this.remove({_id:id});
}



module.exports = mongoose.model("Comment", commentSchema);