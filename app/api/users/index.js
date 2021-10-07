const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// body-parser 패키지를 추가
// POST에서 body값을 읽어오기 위한 패키지

router.use(bodyParser.json()); // express에서 json으로 body를 받음
router.use(bodyParser.urlencoded({extended: true}));

const controller = require('./user.controller');

module.exports = router;
// 이렇게 module.exports를 통해 모듈을 생성한다면
// 다른 코드에서 require('PATH')를 통해 연결할 수 있음
// 바로 위의 controller 객체가 동일함

router.get('/', controller.index);
// 목록 읽기

router.get('/:id', controller.show);
// 항목 읽기

router.delete('/:id',controller.destroy);
// 항목 삭제

router.post('/', controller.create);
// 새항목 입력

router.put('/:id', controller.update);
// 항목 수정