// /api/index.js

const express = require("express");
const router = express.Router();

const user = require("./comment");
const user = require("./parklot");
const user = require("./rate");
const user = require("./user");
const user = require("./zone");

router.use("/comments", user);
router.use("/parklots", user);
router.use("/rates", user);
router.use("/users", user);
router.use("/zones", user);

module.exports = router;

// express.Router 클래스를 사용하면 모듈식 마운팅 가능한 핸들러 사용
// Router 인스턴스는 완전한 미들웨어이자 라우팅 시스템이며, 따라서 “미니 앱(mini-app)”이라고 불린다. 