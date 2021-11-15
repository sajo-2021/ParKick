const router = require('express').Router();

const controller = require('./parklot.controller');

router.get('/', controller.index);
// 모든 주차장 목록 조회
router.post('/', controller.create);

router.get('/no/:no', controller.readno);

router.put('/no/:no', controller.updateno);

router.delete('/no/:no', controller.deleteno);

router.get('/id/:id', controller.readid);

router.put('/id/:id', controller.updateid);

router.delete('/id/:id', controller.deleteid);

router.post('/:no/:user', controller.writecom);

router.put('/:no/:user/:comid', controller.updatecom);

router.delete('/:no/:comid', controller.deletecom);


module.exports = router;