const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');

const controller = require('./parklot.controller');

router.get('/', controller.index);
router.post('/', controller.create);

router.get('/no/:no', controller.readno);
router.get('/id/:oid', controller.readid);

router.delete('/no/:no', controller.deleteno);
router.delete('/id/:oid', controller.deleteid);

router.get('/com/:oid', controller.readComment);

router.use('/com/', authMiddleware);
router.post('/com/', controller.updateComment);
// router.put('/com/', controller.updateComment);
router.delete('/com/:oid/:uid', controller.deleteComment);

router.post('/rate/', controller.updateRate);

router.post('/rpt/', controller.rptLot);

module.exports = router;