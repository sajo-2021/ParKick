const router = require('express').Router();

const controller = require('./park.controller');

router.get('/', controller.index);
// 모든 주차장 목록 조회
router.post('/', controller.create);

router.get('/:no', controller.read_no);

router.put('/:no', controller.update);

router.delete('/:no', controller.delete);


module.exports = router;