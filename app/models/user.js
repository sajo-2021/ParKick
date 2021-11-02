const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true},
    user_pwd: { type: String, required: true},
    user_name: { type: String, required: true},
    user_nick: { type: String, required: true}
});

userSchema.statics.create = function(payload){
    const user = new this(payload);
    return user.save();
}
userSchema.statics.findAll = function(payload){
    return this.find({});
}
userSchema.statics.findOneByUserid = function(userid){
    return this.findOne({user_id: userid});
}

module.exports = mongoose.model('User',userSchema);