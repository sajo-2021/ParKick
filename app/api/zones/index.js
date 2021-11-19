const router = require('express').Router();

const controller = require('./zone.controller');

router.get('/', controller.index);

router.post('/', controller.create);

router.get('/no/:no', controller.readno);
router.put('/no/:no', controller.updateno);
router.delete('/no/:no', controller.deleteno);
// zoneno로 조회 수정 삭제

router.get('/id/:id', controller.readid);
router.put('/id/:id', controller.updateid);
router.delete('/id/:id', controller.deleteid);
// _id로 조회 수정 삭제

module.exports = router;