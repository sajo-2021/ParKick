const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
    // 영역 정보의 document 형식
    point_no: { type: String, required:true},
    point_latitude: { type: Number, required:true},
    point_longitude: { type: Number, required:true},
    user_id: { type: String }
},{ timestamps:true });


geoSchema.statics.create = function (payload) {
    const geo = new this(payload);
    // 데이터가 통으로 전달되면 controller에서
    // 데이터를 가공하여 payload를 만들어 호출하라

    return geo.save();
};

module.exports = mongoose.model('Geo',geoSchema);