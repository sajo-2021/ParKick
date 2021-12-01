const express = require('express');
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');
// body-parser 패키지를 추가
// POST에서 body값을 읽어오기 위한 패키지
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.json()); // express에서 json으로 body를 받음
app.use(bodyParser.urlencoded({extended: true})); // 이건뭐지
// Static file Service
app.use(express.static('public'));


// /users로 접속하는 요청은 './api/users' 과 연결, index.js와 자동 연결
app.use('/users', require('./api/users'));
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