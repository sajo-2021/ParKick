const Todo = require('../../models/todo');

// 127.0.0.1:3000/todos로 들어오는 GET 요청 설정
exports.index = (req, res) => {
    // 모델의 함수 (Custom Statics Method) 실행
    Todo.findAll().then((todos) => {
        // 반환된 값인 todos의 길이를 확인하여 404 에러처리
        if(!todos.length) return res.status(404).send({err: 'Todo not found'});
        // todos가 존재한다면 response에 해당 문자열을 전송
        res.send(`find successfully: ${todos}`);
        // 추가적으로 발생하는 에러는 500 에러코드로 에러내용을 전송해줌
    }).catch(err => res.status(500).send(err));
};


exports.idread = (req, res) => {
    Todo.findOneByTodoid(req.params.todoid)
        .then((todo) => {
            if(!todo) return res.status(404).send({err: 'Todo not found'});
            res.send(`find successfully: ${todo}`);
        })
        .catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
    Todo.create(req.body)
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
    Todo.updateByTodoid(req.params.todoid, req.body)
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
    Todo.deleteByTodoid(req.params.todoid)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
};