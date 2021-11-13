const router = require('express').Router();

const controller = require('./rate.controller');

router.get('/', controller.index);

router.post('/', controller.create);

router.get('/no/:no', controller.readno);

router.put('/no/:no', controller.updateno);

router.delete('/no/:no', controller.deleteno);

router.get('/id/:id', controller.readid);

router.put('/id/:id', controller.updateid);

router.delete('/id/:id', controller.deleteid);

module.exports = router;