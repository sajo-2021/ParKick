const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, trim:true, required: true},
    pwd: { type: String, trim:true, required: true},
    name: { type: String, required: true},
    nickname: { type: String},
    email: {
        type:String, required:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Email is invalid");
        }
    }
},{
    timestamps:true
});


userSchema.statics.create = function(payload){
    const user = new this(payload);
    return user.save();
}
userSchema.statics.findAll = function(payload){
    return this.find({});
}
userSchema.statics.findOneByUserid = function(id){
    return this.findOne({id: id});
}

module.exports = mongoose.model('User',userSchema);