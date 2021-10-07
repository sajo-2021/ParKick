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


let users = [
    {
        id: 1,
        name: 'Hyun'
    },
    {
        id: 2,
        name: 'Alice'
    },
    {
        id: 3,
        name: 'Kelly'
    }
]

// exports 코드를 통해 외부에 연결 가능
exports.index = (req, res) => {
    return res.json(users);
};

exports.show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect id'});
    }

    let user = users.filter(user => user.id === id)[0]
    if(!user){
        return res.status(404).json({err: 'Unknown user!'});
    }

    return res.json(user);
};

exports.destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    // request의 parameter 중 id를 10진수로 파싱
    if(!id){
        return res.status(400).json({err: 'Incorrect id'});
        // 숫자가 아닐 경우 에러코드와 메세지 전송
    }

    const userIdx = users.findIndex( user => {
        return user.id === id;
    });
    // users 배열에서 id가 같은 객체 찾기
    if(userIdx === -1){
        return res.status(404).json({err: 'Unknown user'});
        // 만약 id가 같은 객체가 없으면 에러코드와 메세지 전송
    }
    users.splice(userIdx, 1);
    // users 배열에서 userIdx와 같은 id의 객체 제거
    res.status(204).send();
    // 삭제가 완료되면 상태코드 전송
};

exports.create = (req, res) => {
    const name = req.body.name || ''; // 전달된 이름을 기록, 없으면 공란으로
    if(!name.length){
        return res.status(400).json({err: 'Incorrect name'});
        // name이 공란일 경우 에러코드와 json 에러메세지 전송
    }

    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
    }, 0) + 1;
    // users의 각 요소에 대해 maxId값을 결정하고 반환하게 되는 함수 실행
    // maxId는 누적값, user는 현재값으로 모든 users의 객체를 순회하게 된다.
    // users의 모든 user를 순회하면서 가장 큰 id 값을 반환하고 거기에 1을 더함

    const newUser = {
        id: id,
        name: name
    };
    // id와 name으로 배열에 추가할 객체를 생성

    users.push(newUser);
    // users 배열에 새로운 사용자 객체 입력

    return res.status(201).json(newUser);
    // 입력이 완료되면 상태값과 입력된 user 정보를 다시 반환해준다.
};

exports.update = (req, res) => {

};