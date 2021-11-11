const router = require('express').Router();

const controller = require('./view.controller');

router.get('/', controller.index);

router.get('/:no', controller.readno);

router.get('/user/:id', controller.readUserid);

router.post('/', controller.create);

router.put('/:no', controller.update);

router.delete('/:no', controller.delete);

module.exports = router;