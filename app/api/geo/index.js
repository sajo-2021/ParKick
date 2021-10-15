const router = require('express').Router();

const controller = require('./geo.controller');

router.get('/', controller.index);

module.exports = router;