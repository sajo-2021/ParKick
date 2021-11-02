const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    point_no: { type: String, required:true},
    point_latitude: { type: Number, required:true},
    point_longitude: { type: Number, required:true},
    user_id: { type: String }
})

pointSchema.statics.create = function (payload) {
    const point = new this(payload);
    // 데이터가 통으로 전달되면 controller에서
    // 데이터를 가공하여 payload를 만들어 호출하라

    return point.save();
}
pointSchema.statics.findAll = function(){
    return this.find({});
}
pointSchema.statics.findOneByPointno = function(pointno){
    return this.findOne({point_no: pointno});
}

module.exports = mongoose.model('Point',pointSchema);