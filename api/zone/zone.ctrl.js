// /api/zone/zone.ctrl.js
const Zone = require("../../models/zone");

/*
  POST /zones 주차공간 추가
*/
exports.zoneCreate = async (req, res) => {
  const zone = new Zone(req.body);

  try {
    await zone.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "Zone 저장 실패",
    });
  }
};

/*
    GET /zones 주차공간 조회
*/
exports.zoneList = async (req, res) => {
  try {
    const zones = await zone.find({});

    res.status(200).send(zones);
  } catch (e) {
    res.status(500).json({
      message: "Zone 조회 실패",
    });
  }
};

/*
    GET /zones/:id 특정 주차공간 조회
*/
exports.zoneRead = async (req, res) => {
  const id = req.params.id;

  try {
    const zone = await Zone.findById(id);

    if (!this.zoneRead) {
      return res.status(404).send();
    }

    res.status(200).send(zone);
  } catch (e) {
    res.status(500).json({
      message: "특정 Zone 조회 실패",
    });
  }
};

/*
    DELETE /zones/:id 특정 주차공간 제거
*/
exports.zoneDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const zone = await Zone.findByIdAndDelete(id);

    if (!zone) {
      return res.status(404).send();
    }

    res.status(200).send(zone);
  } catch (e) {
    res.status(500).json({
      message: "특정 Zone 삭제 실패",
    });
  }
};