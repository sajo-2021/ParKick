const express = require('express');
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');
// body-parser 패키지를 추가
// POST에서 body값을 읽어오기 위한 패키지
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // express에서 json으로 body를 받음
app.use(bodyParser.urlencoded({extended: true})); // 이건뭐지
// Static file Service
app.use(express.static('public'));


// /users로 접속하는 요청은 './api/users' 과 연결, index.js와 자동 연결
app.use('/users', require('./api/users'));
// /todos로 접속하는 요청은 './api/todo/todos'로 연결, todos.js와 연결됨
app.use('/todos', require('./api/todo'));
app.use('/parklots', require('./api/parklots'));
app.use('/zones', require('./api/zones'));
app.use('/rates', require('./api/rates'));
app.use('/comments', require('./api/comments'));

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));


app.get('/', (req, res) => {
    res.send('Hello world!\n');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
// 3000포트로 연결하고 로그 남김

module.exports = app;
// app을 module로 export


/*
app.get('/users', (req, res) => {
    return res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect id'});
    }

    let user = users.filter(user => user.id === id)[0]
    if(!user){
        return res.status(404).json({err: 'Unknown user!'});
    }

    return res.json(user);
});



// delete 구현
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    // request의 parameter 중 id를 10진수로 파싱
    if(!id){
        return res.status(400).json({err: 'Incorrect id'});
        // 숫자가 아닐 경우 에러코드와 메세지 전송
    }

    const userIdx = users.findIndex( user => {
        return user.id === id;
    });
    // users 배열에서 id가 같은 객체 찾기
    if(userIdx === -1){
        return res.status(404).json({err: 'Unknown user'});
        // 만약 id가 같은 객체가 없으면 에러코드와 메세지 전송
    }
    users.splice(userIdx, 1);
    // users 배열에서 userIdx와 같은 id의 객체 제거
    res.status(204).send();
    // 삭제가 완료되면 상태코드 전송
});

// post 구현
app.post('/users', (req, res) => {
    const name = req.body.name || ''; // 전달된 이름을 기록, 없으면 공란으로
    if(!name.length){
        return res.status(400).json({err: 'Incorrect name'});
        // name이 공란일 경우 에러코드와 json 에러메세지 전송
    }

    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
    }, 0) + 1;
    // users의 각 요소에 대해 maxId값을 결정하고 반환하게 되는 함수 실행
    // maxId는 누적값, user는 현재값으로 모든 users의 객체를 순회하게 된다.
    // users의 모든 user를 순회하면서 가장 큰 id 값을 반환하고 거기에 1을 더함

    const newUser = {
        id: id,
        name: name
    };
    // id와 name으로 배열에 추가할 객체를 생성

    users.push(newUser);
    // users 배열에 새로운 사용자 객체 입력

    return res.status(201).json(newUser);
    // 입력이 완료되면 상태값과 입력된 user 정보를 다시 반환해준다.
})

*/