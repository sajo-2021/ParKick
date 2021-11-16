const router = require('express').Router();

const controller = require('./rate.controller');

router.get('/', controller.index);

router.post('/', controller.create);

router.get('/id/:id', controller.read);

router.put('/id/:id', controller.update);

router.delete('/id/:id', controller.delete);

module.exports = router;