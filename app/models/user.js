const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../../config');
var Comment = require('./comment');

const userSchema = new mongoose.Schema({
    id: { type: String, trim:true, required: true, unique:true},
    pwd: { type: String, trim:true, required: true},
    name: { type: String, required: true},
    nickname: { type: String, required: true},
    email: {
        type:String, required:true,
        // validate(value){
        //     if(!validator.isEmail(value)) throw new Error("Email is invalid");
        // }
    },
    lot_rate_list: [new mongoose.Schema({
        lot: {type: mongoose.Schema.Types.ObjectId, ref: 'Parklot'},
        myrate: {type: Number, default: 0 }
    },{
        _id: false
    })],
    mycomments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
},{
    timestamps:true
});


userSchema.statics.create = function(payload){
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(payload.pwd)
                            .digest('base64')

    payload.pwd = encrypted;

    const user = new this(payload);
    return user.save();
}

userSchema.statics.findAll = function(payload){
    return this.find({}).
                populate('mycomments', '-_id comment').
                populate({
                    path : 'lot_rate_list',
                    populate : {path: 'lot', select : '-_id lotid'}
                });
}
userSchema.statics.findOneById = function(id){
    return this.findOne({_id: id}, '-pwd').
                populate('mycomments', '-_id comment').
                populate({
                    path : 'lot_rate_list',
                    populate : {path: 'lot', select : '-_id lotid'}
                });
}
userSchema.statics.updateById = function(id, payload){
    return this.findOneAndUpdate({_id: id},{$set: payload}, {new: true});
}
userSchema.statics.deleteById = function(id){
    return this.deleteOne({_id: id});
}


userSchema.statics.logIn = function(id){
    return this.findOne({id: id});
}
userSchema.statics.findOneByUserid = function(id){
    return this.findOne({id: id}, '-pwd').
                populate('mycomments', '-_id comment').
                populate({
                    path : 'lot_rate_list',
                    populate : {path: 'lot', select : '-_id lotid'}
                });
}
userSchema.statics.updateByUserid = function(id, payload){
    return this.findOneAndUpdate({id: id},{$set: payload}, {new: true});
}
userSchema.statics.deleteByUserid = function(id){
    return this.deleteOne({id: id});
}

userSchema.methods.verify = function(password){
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(password)
                            .digest('base64')

    return this.pwd === encrypted
}


module.exports = mongoose.model('User',userSchema);