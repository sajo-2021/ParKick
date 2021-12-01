// const models = require('../../models/models');
//  mysql DB를 연결하는 코드를 model로 불러옴
//  mongoose 사용 시 이처럼 연결하면 된다.

//      위의 models가 연결된 모듈은 다음과 같음
// module.exports = {
//     sequelize: sequelize,
//     User: User
// }
//     해당 코드에서 mysql을 연결한 sequelize 객체와
//     sequelize에 정의한 모델인 User 모델을 모듈로 내보낸다.
const User = require('../../models/user');

// exports 코드를 통해 외부에 연결 가능
exports.index = (req, res) => {
    User.findAll().then((users) => {
        if(!users.length) return res.status(404).send({err: 'SE09'});
        res.send(users);

    }).catch(err => res.status(500).send(err));
};

exports.read = (req, res) => {
    User.findOneByUserid(req.params.id).then((user) => {
        if(!user) return res.status(404).send({err: 'SE09'});
        res.send(user);

    }).catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
    User.create(req.body).then((user) => {
        res.send(user);

    }).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
    User.updateByUserid(req.params.id, req.body).then((user) => {
        res.send(user);

    }).catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
    User.deleteByUserid(req.params.id).then((user) => {
        res.sendStatus(200);

    }).catch(err => res.status(500).send(err));
};

exports.readid = (req, res) => {
    User.findOneById(req.params.id).then((user) => {
        if(!user) return res.status(404).send('SE09');
        res.send(user);

    }).catch(err => res.status(500).send(err));
};

exports.updateid = (req, res) => {
    User.updateById(req.params.id, req.body).then((user) => {
        res.send(user);

    }).catch(err => res.status(500).send(err));
};

exports.deleteid = (req, res) => {
    User.deleteById(req.params.id).then((user) => {
        res.sendStatus(200);

    }).catch(err => res.status(500).send(err));
};