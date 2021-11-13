// /api/comment/comment.ctrl.js
const comment = require("../../models/comment");

/*
  POST /comments 댓글 추가
*/
exports.commentCreate = async (req, res) => {
  const comment = new Comment(req.body);

  try {
    await comment.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "Comment 저장 실패",
    });
  }
};

/*
    GET /comments 댓글 조회
*/
exports.commentList = async (req, res) => {
  try {
    const comments = await comment.find({});

    res.status(200).send(comments);
  } catch (e) {
    res.status(500).json({
      message: "Comment 조회 실패",
    });
  }
};

/*
    GET /comments/:id 특정 댓글 조회
*/
exports.commentRead = async (req, res) => {
  const id = req.params.id;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).send();
    }

    res.status(200).send(comment);
  } catch (e) {
    res.status(500).json({
      message: "특정 Comment 조회 실패",
    });
  }
};

/*
    PATCH /comments/:id 특정 댓글 특정필드 변경
*/
exports.commentUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const comment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!comment) {
      return res.status(404).send();
    }

    res.status(200).send(comment);
  } catch (e) {
    res.status(500).json({
      message: "특정 Comment 변경 실패",
    });
  }
};

/*
    DELETE /comments/:id 특정 댓글 제거
*/
exports.commentDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).send();
    }

    res.status(200).send(comment);
  } catch (e) {
    res.status(500).json({
      message: "특정 Comment 삭제 실패",
    });
  }
};