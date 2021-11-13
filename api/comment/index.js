// /api/comment/index.js

const express = require("express");
const router = express.Router();
const commentController = require("./comment.ctrl");

router.post("", commentController.commentCreate);
router.get("", commentController.commentList);
router.get("/:id", commentController.commentRead);
router.patch("/:id", commentController.commentUpdate);
router.delete("/:id", commentController.commentDelete);

module.exports = router;

// express.Router 클래스를 사용해서 분리 
// 이번에는 그 경로가 다양하게 나눠져 있다.
// 다양하게 나눠진 경로와 컨트롤러 함수를 매칭시킨다.