const mongoose = require('mongoose');
var Parklot = require('./parklot');

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
    },
    lot_rate_list: [{
        lot: mongoose.Schema.Types.ObjectId,
        myrate: Number
    }],
    mycomments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
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

userSchema.methods.addComment = function(cid){
    this.mycomments.push({cid});
}

userSchema.methods.updateRate = function(check, lot) {

    // if(check===1){
    //     this.update({'lot_rate_list.lot': lot}, {$set:{'lot_rate_list.$.myrate':1}},{new: true});
    //     Parklot.findOneById(lot).then((lot) => lot.rateLike());
    // }else if(check===2){
    //     this.update({'lot_rate_list.lot': lot}, {$set:{'lot_rate_list.$.myrate':2}},{new: true});
    //     Parklot.findOneById(lot).then((lot) => lot.rateDislike());
    // }
}


module.exports = mongoose.model('User',userSchema);