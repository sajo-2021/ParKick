const router = require('express').Router();

const controller = require('./comment.controller');

router.get('/', controller.index);
router.get('/id/:id', controller.readid);

router.delete('/id/:id', controller.delete);


module.exports = router;