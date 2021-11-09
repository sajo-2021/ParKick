const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    point_no: { type: String, required:true},
    point_latitude: { type: Number, required:true},
    point_longitude: { type: Number, required:true},
    user_id: { type: String }
    // 필드에 다른 오브젝트의 아이디를 지정할 수 있음
    // { type: Schema.Types.ObjectId, ref:'스키마이름' }
    // 이러한 아이디에 대해 .populate(필드이름) 으로 해당 오브젝트를 불러올 수 있음
    
});

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