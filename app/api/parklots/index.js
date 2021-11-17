const router = require('express').Router();

const controller = require('./parklot.controller');

router.get('/', controller.index);
// 모든 주차장 목록 조회
router.post('/', controller.create);

router.get('/no/:no', controller.readno);

router.get('/id/:id', controller.readid);

router.delete('/no/:no', controller.deleteno);

router.delete('/id/:id', controller.deleteid);

router.post('/com/:no/:user', controller.writeComment);
router.put('/com/:no/:comid', controller.updatecom);
router.delete('/com/:no/:comid', controller.deletecom);

router.post('/rate/', controller.updateRate);

module.exports = router;