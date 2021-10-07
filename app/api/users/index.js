const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// body-parser 패키지를 추가
// POST에서 body값을 읽어오기 위한 패키지

router.use(bodyParser.json()); // express에서 json으로 body를 받음
router.use(bodyParser.urlencoded({extended: true}));

const controller = require('./user.controller');

module.exports = router;

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id',controller.destroy);

router.post('/', controller.create);

router.put('/:id', controller.update);