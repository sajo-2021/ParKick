const router = require('express').Router();

const controller = require('./parklot.controller');

router.get('/', controller.index);
router.post('/', controller.create);

router.get('/no/:no', controller.readno);
router.get('/id/:id', controller.readid);

router.delete('/no/:no', controller.deleteno);
router.delete('/id/:id', controller.deleteid);

router.get('/com/no/:no', controller.readComment);
router.post('/com/', controller.writeComment);
router.put('/com/', controller.updateComment);
router.delete('/com/:no/:user', controller.deleteComment);

router.post('/rate/', controller.updateRate);

router.post('/rpt/', controller.rptLot);

module.exports = router;