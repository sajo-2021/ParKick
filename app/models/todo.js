const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoid: {type: Number, required: true, unique:true},
    content: {type: String, require:true},
    completed: {type: String, default:false}
    },
    {
        timestamps:true
});

// 새로운 todo document를 생성
todoSchema.statics.create = function (payload) {
    const todo = new this(payload);
    // this는 model

    return todo.save();
    // return promise
};

// 화살표 함수는 this나 super에 대한 바인딩이 불가능함
todoSchema.statics.findAll = function () {
    return this.find({});
    // returm promise
};

todoSchema.statics.findOneByTodoid = function (todoid) {
    return this.findOne({todoid});
};

todoSchema.statics.updateByTodoid = function (todoid, payload) {
    // {new: true}는 수정된 document를 return 한다.
    return this.findOneAndUpdate({ todoid }, payload, {new: true});
};

todoSchema.statics.deletyByTodoid = function (todoid) {
    return this.remove({ todoid });
};

module.exports = mongoose.model('Todo', todoSchema);