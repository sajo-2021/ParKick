const Point = require('../../models/point');

exports.index = (req, res) => {
    Point.findAll().then((points) => {
        if(!points.length) return res.status(404).send({err: 'point not found!'});
        res.send(points);
    }).catch(err => res.status(500).send(err));
}

exports.readno = (req, res) => {
    Point.findOneByPointno(req.params.no).then((point) => {
        if(!point) return res.status(404).send({err: 'point not found!'});
        res.send(point);

        console.log('point read log');
        console.log(point);
        console.log('-----------------');
    }).catch(err => res.status(500).send(err));
}

exports.create = (req, res) => {
    Point.create(req.body).then((point) => {
        res.send(point);

        console.log('point create log');
        console.log(req.body);
        console.log('----------------------');
    }).catch(err => res.status(500).send(err));
}

exports.update = (req, res) => {
    Point.updateByParkno(req.params.no, req.body).then((point) => {
        res.send(point);

        console.log('point update log');
        console.log(req.body);
        console.log('---------------------');
    }).catch(err => res.status(500).send(err));
}

exports.delete = (req, res) => {
    Point.deleteByPointno(req.params.no).then((point) => {
        res.sendStatus(200);
        
        console.log('point delete log');
        console.log(point);
        console.log('------------------------');
    }).catch(err => res.status(500).send(err));
}