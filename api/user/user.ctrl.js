// /api/user/user.ctrl.js
const User = require("../../models/user");

/*
  POST /users 유저 추가
  {
      name: string,
      email: string,
      age: int
  }
*/
exports.userCreate = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "User 저장 실패",
    });
  }
};

/*
    GET /users 유저 조회
*/
exports.userList = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (e) {
    res.status(500).json({
      message: "User 조회 실패",
    });
  }
};

/*
    GET /users/:id 특정 유저 조회
*/
exports.userRead = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 조회 실패",
    });
  }
};

/*
    PATCH /users/:id 특정 유저 특정 필드 변경
*/
exports.userUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 변경 실패",
    });
  }
};

/*
    DELETE /users/:id 특정 유저 제거
*/
exports.userDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 삭제 실패",
    });
  }
};