const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    user_id: { type: String, required: true},
    park_no: { type: String, required: true, unique:true },
    view_stars: { type: Number, required: true},
    view_review: String
}, {timestamps: true});

viewSchema.statics.create = function(payload){
    const view = new this(payload);
    return view.save();
}
viewSchema.statics.findAll = function(){
    return this.find({});
}
viewSchema.statics.findOneByParkno = function(parkno){
    return this.findOne({park_no: parkno});
}
viewSchema.statics.findByUserid = function(userid){
    return this.find({user_id:userid});
}
viewSchema.statics.updateByParkno = function(parkno, payload){
    return this.findOneAndUpdate({park_no:parkno}, {$set: payload}, {new:true});
}
viewSchema.statics.deleteByParkno = function(parkno){
    return this.remove({park_no:parkno});
}

module.exports = mongoose.model('View',viewSchema);