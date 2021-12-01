const mongoose = require('mongoose');
var Comment = require('./comment');

const userSchema = new mongoose.Schema({
    id: { type: String, trim:true, required: true, unique:true},
    pwd: { type: String, trim:true, required: true},
    name: { type: String, required: true},
    nickname: { type: String},
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
    const user = new this(payload);
    return user.save();
}
userSchema.statics.findAll = function(payload){
    return this.find({}, '-pwd').
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



module.exports = mongoose.model('User',userSchema);