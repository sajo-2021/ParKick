const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, trim:true, required: true},
    pwd: { type: String, trim:true, required: true},
    name: { type: String, required: true},
    nickname: { type: String},
    email: {
        type:String, required:true,
        // validate(value){
        //     if(!validator.isEmail(value)) throw new Error("Email is invalid");
        // }
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
userSchema.statics.findOneByUserid = function(user){
    return this.findOne({id: user});
}
userSchema.statics.updateByUserid = function(user, payload){
    return this.findOneAndUpdate({id: user}, {$set: payload}, {new: true});
}
userSchema.statics.deleteByUserid = function(user){
    return this.remove({id: user});
}

userSchema.statics.findOneById = function(id){
    return this.findOne({_id: id});
}
userSchema.statics.updateById = function(id, payload){
    return this.findOneAndUpdate({_id: id},{$set: payload}, {new: true});
}
userSchema.statics.deleteById = function(id){
    return this.remove({_id: id});
}

module.exports = mongoose.model('User',userSchema);