const router = require('express').Router();

const controller = require('./point.controller');

router.get('/', controller.index);

router.get('/:no', controller.readno);

router.post('/', controller.create);

router.put('/:no', controller.update);

router.delete('/:no', controller.delete);

module.exports = router;