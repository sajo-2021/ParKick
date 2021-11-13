// /api/user/index.js

const express = require("express");
const router = express.Router();
const userController = require("./user.ctrl");

router.post("", userController.userCreate);
router.get("", userController.userList);
router.get("/:id", userController.userRead);
router.patch("/:id", userController.userUpdate);
router.delete("/:id", userController.userDelete);

module.exports = router;

// express.Router 클래스를 사용해서 분리 
// 이번에는 그 경로가 다양하게 나눠져 있다.
// 다양하게 나눠진 경로와 컨트롤러 함수를 매칭시킨다.