const mongoose = require('mongoose');

// todo에 관한 스키마를 생성
// mongoose는 스키마를 기준으로 데이터를 DB에 넣기 전에 먼저 검사함
const todoSchema = new mongoose.Schema({
    todoid: {type: Number, required: true, unique:true},
    content: {type: String, require:true},
    completed: {type: String, default:false}
    },
    {
        timestamps:true
})

// Schema.statics.funcName - model의 메소드 (모델 전체에 대한 것)
// Schema.methods.funcName - instance, document의 메소드 (document에 대한 것)

// 새로운 todoSchema의 document를 생성하고 저장
todoSchema.statics.create = function (payload) {
    const todo = new this(payload);
    // statics에서 this는 model 자체를 가리킴

    return todo.save();
    // return promise
}

// 화살표 함수는 this나 super에 대한 바인딩이 불가능함
todoSchema.statics.findAll = function () {
    return this.find({});
    // mongoose의 query함수, find({})는 모델의 모든 document를 찾는다.
}

todoSchema.statics.findOneByTodoid = function (todoid) {
    return this.findOne({ todoid: todoid });
}

todoSchema.statics.updateByTodoid = function (todoid, payload) {
    // {new: true}는 수정된 document를 return 한다.
    return this.findOneAndUpdate({ todoid }, payload, {new: true});
}

todoSchema.statics.deletyByTodoid = function (todoid) {
    return this.remove({ todoid });
}

// 'Todo' 모델 생성
module.exports = mongoose.model('Todo', todoSchema);