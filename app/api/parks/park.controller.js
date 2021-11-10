const Park = require('../../models/park');

exports.index = (req, res) => {
    Park.findAll().then((parks) => {
        if(!parks.length) return res.status(404).send({err: 'parks not found!'});
        res.send(parks);

        console.log('주차장 목록 로그');
        console.log(parks);
        console.log('---------------');
    }).catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
    Park.create(req.body)
        .then(park => {
            res.send(park)
            
            console.log('주차장 create 로그');
            console.log(req.body);
            console.log('-------------------');
        })
        .catch(err => res.status(500).send(err));
}

exports.read_no = (req, res) => {
    Park.findOneByParkno(req.params.no)
        .then((park) => {
            if(!park) return res.status(404).send({err: 'park not found!'});
            res.status(200).send(park);

            console.log('주차장 no 조회');
            console.log(park);
            console.log('------------------------');
        }).catch(err => res.status(500).send(err));
}

exports.update = (req, res) => {
    Park.updateByParkno(req.params.no, req.body)
        .then(park => {
            res.send(park)
            
            console.log('주차장 update 로그');
            console.log(`no: ${req.params.no}`);
            console.log(req.body);
            console.log('-------------------');
        })
        .catch(err => res.status(500).send(err));
}

exports.delete = (req, res) => {
    Park.deleteByParkno(req.params.no)
        .then((park) => {
            res.sendStatus(200)

            console.log('주차장 delete 로그');
            console.log(park);
            console.log('------------------');
        })
        .catch(err => res.status(500).send(err));
}