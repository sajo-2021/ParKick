const router = require('express').Router();

const controller = require('./point.controller');

router.get('/', controller.index);

module.exports = router;