// /api/parklot/parklot.ctrl.js
const Parklot = require("../../models/parklot");

/*
  POST /parklots 주차장 추가
*/
exports.parklotCreate = async (req, res) => {
  const parklot = new Parklot(req.body);

  try {
    await parklot.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "Parklot 저장 실패",
    });
  }
};

/*
    GET /parklots 주차장 조회
*/
exports.parklotList = async (req, res) => {
  try {
    const parklots = await parklot.find({});

    res.status(200).send(parklots);
  } catch (e) {
    res.status(500).json({
      message: "Parklot 조회 실패",
    });
  }
};

/*
    GET /parklots/:id 특정 주차장 조회
*/
exports.parklotRead = async (req, res) => {
  const id = req.params.id;

  try {
    const parklot = await Parklot.findById(id);

    if (!this.parklotRead) {
      return res.status(404).send();
    }

    res.status(200).send(parklot);
  } catch (e) {
    res.status(500).json({
      message: "특정 Parklot 조회 실패",
    });
  }
};

/*
    DELETE /parklots/:id 특정 주차장 제거
*/
exports.parklotDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const parklot = await Parklot.findByIdAndDelete(id);

    if (!parklot) {
      return res.status(404).send();
    }

    res.status(200).send(parklot);
  } catch (e) {
    res.status(500).json({
      message: "특정 parklot 삭제 실패",
    });
  }
};