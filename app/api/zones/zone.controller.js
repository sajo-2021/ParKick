const Zone = require('../../models/zone');

exports.index = (req, res) => {
    Zone.findAll().then((zones) => {
        if(!zones.length) return res.status(404).send({err: 'SE09'});
        res.send(zones);

    }).catch(err => res.status(500).send(err));
}

exports.create = (req, res) => {
    Zone.create(req.body).then((zone) => {
        res.send(zone);

    }).catch(err => res.status(500).send(err));
}

exports.readid = (req, res) => {
    Zone.findOneById(req.params.id).then((zone) => {
        if(!zone) return res.status(404).send({err: 'SE09'});
        res.send(zone);

    }).catch(err => res.status(500).send(err));
}

exports.updateid = (req, res) => {
    Zone.updateById(req.params.id, req.body).then((zone) => {
        res.send(zone);

    }).catch(err => res.status(500).send(err));
}

exports.deleteid = (req, res) => {
    Zone.deleteById(req.params.id).then((zone) => {
        res.sendStatus(200);
        
    }).catch(err => res.status(500).send(err));
}