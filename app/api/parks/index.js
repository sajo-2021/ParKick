const router = require('express').Router();

const controller = require('./park.controller');

router.get('/', controller.index);

module.exports = router;