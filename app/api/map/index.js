const router = require('express').Router();

const controller = require('./map.controller');

router.get('/', controller.index);

module.exports = router;