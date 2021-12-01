const router = require('express').Router();
// express에서 제공하는 라우터 객체를 이용


const controller = require('./user.controller');

router.get('/', controller.index);
// 목록 읽기

router.post('/', controller.create);
// 유저 생성

router.get('/userid/:id', controller.read);
router.put('/userid/:id', controller.update);
router.delete('/userid/:id',controller.delete);
// userid로 조회 수정 삭제

router.get('/id/:id', controller.readid);
router.put('/id/:id', controller.updateid);
router.delete('/id/:id', controller.deleteid);
// _id로 조회 수정 삭제



module.exports = router;