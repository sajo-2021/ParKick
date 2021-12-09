const jwt = require('jsonwebtoken');

const User = require('../../models/user');
/*
    POST /auth/register
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

/*
    POST /auth/login
    {
        id,
        pwd
    }
*/

exports.login = (req, res) => {
    const {id, pwd} = req.body;
    const secret = req.app.get('jwt-secret')

    const check = (user) => {
        if(!user){
            throw new Error('login failed, user is null');
        }else{
            if(user.verify(pwd)){
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            id: user.id,
                            name: user.name,
                            nickname: user.nickname,
                            email: user.email
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer:'velopert.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if(err) reject(err);
                            resolve(token);
                        }
                    );
                })
                return p;
            }else{
                throw new Error('login failed, pwd is invalid');
            }
        }
    }

    const respond = (token) => {
        res.send({
            message: 'logged in successfully',
            token
        });
    }

    const onError = (err) => {
        res.status(403).send({
            err: err.message
        })
    }

    User.logIn(id)
    .then(check)
    .then(respond)
    .catch(onError)
}

/*
    GET /auth/check
*/

exports.check = (req, res) => {
    const token = req.headers['x-access-token'] || req.query.token

    if(!token){
        return res.status(403).send({
            success: false,
            message: 'not logged in'
        })
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if(err) reject(err)
            resolve(decoded)
        })
    })

    const respond = (token) => {
        res.send({
            success: true,
            info: token
        })
    }

    const onError = (err) => {
        res.status(403).send({
            success: false,
            err: err.message
        })
    }

    p.then(respond).catch(onError)
}