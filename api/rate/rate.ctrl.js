// /api/rate/rate.ctrl.js
const Rate = require("../../models/rate");

/*
  POST /rates 좋아요/싫어요 추가
*/
exports.rateCreate = async (req, res) => {
  const rate = new Rate(req.body);

  try {
    await rate.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "Rate 저장 실패",
    });
  }
};

/*
    GET /rates 좋아요/싫어요 조회
*/
exports.rateList = async (req, res) => {
  try {
    const rates = await rate.find({});

    res.status(200).send(rates);
  } catch (e) {
    res.status(500).json({
      message: "rate 조회 실패",
    });
  }
};

/*
    DELETE /rates/:id 특정 좋아요/싫어요 제거
*/
exports.rateDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const rate = await Rate.findByIdAndDelete(id);

    if (!rate) {
      return res.status(404).send();
    }

    res.status(200).send(rate);
  } catch (e) {
    res.status(500).json({
      message: "특정 Rate 삭제 실패",
    });
  }
};