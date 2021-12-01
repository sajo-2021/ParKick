const router = require('express').Router();

const controller = require('./rate.controller');

router.get('/', controller.index);
router.get('/id/:id', controller.read);

router.delete('/id/:id', controller.delete);

module.exports = router;