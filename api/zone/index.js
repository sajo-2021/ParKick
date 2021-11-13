// /api/zone/zone.js

const express = require("express");
const router = express.Router();
const zoneController = require("./zone.ctrl");

router.post("", zoneController.zoneCreate);
router.get("", zoneController.zoneList);
router.get("/:id", zoneController.zoneRead);
router.delete("/:id", zoneController.zoneDelete);

module.exports = router;

// express.Router 클래스를 사용해서 분리 
// 이번에는 그 경로가 다양하게 나눠져 있다.
// 다양하게 나눠진 경로와 컨트롤러 함수를 매칭시킨다.