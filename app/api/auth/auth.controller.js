const User = require('../../models/user');
/*
    POST /auth
    {
        id,
        pwd,
        name,
        nickname,
        email
    }
*/

exports.register = (req, res) => {
    const {id, pwd, name, nickname, email} = req.body;
    let newUser = null;

    const create = (user) => {
        if(user){
            throw new Error('username exists');
        }else{
            return User.create(req.body);
        }
    }


    const respond = (register) => {
        res.json({
            message: 'registerd successfully'
        })
    }

    const onError = (err) => {
        res.status(409).send({err: err.message});
    }

    User.findOneByUserid(id)
    .then(create)
    .then(respond)
    .catch(onError);
}