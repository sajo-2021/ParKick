const router = require('express').Router();

const controller = require('./view.controller');

router.get('/', controller.index);

module.exports = router;