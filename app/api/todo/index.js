const router = require('express').Router();

const controller = require('./todo.controller');


router.get('/', controller.index);

router.get('/todoid/:todoid', controller.idread);

router.post('/', controller.create);

router.put('/todoid/:todoid', controller.update);

router.delete('/todoid/:todoid', controller.delete);


module.exports = router;