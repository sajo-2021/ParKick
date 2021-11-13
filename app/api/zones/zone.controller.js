const Zone = require('../../models/zone');

exports.index = (req, res) => {
    Zone.findAll().then((zones) => {
        if(!zones.length) return res.status(404).send({err: 'SE09'});
        res.send(zones);

        console.log('zone list log');
    }).catch(err => res.status(500).send(err));
}

exports.create = (req, res) => {
    Zone.create(req.body).then((zone) => {
        res.send(zone);

        console.log('zone create log');
        console.log(req.body);
        console.log('----------------------');
    }).catch(err => res.status(500).send(err));
}

exports.readno = (req, res) => {
    Zone.findOneByZone(req.params.no).then((zone) => {
        if(!zone) return res.status(404).send({err: 'SE09'});
        res.send(zone);

        console.log('zone readno log');
        console.log(zone);
        console.log('-----------------');
    }).catch(err => res.status(500).send(err));
}

exports.updateno = (req, res) => {
    Zone.updateByZone(req.params.no, req.body).then((zone) => {
        res.send(zone);

        console.log('zone updateno log');
        console.log(req.body);
        console.log('---------------------');
    }).catch(err => res.status(500).send(err));
}

exports.deleteno = (req, res) => {
    Zone.deleteByZone(req.params.no).then((zone) => {
        res.sendStatus(200);
        
        console.log('zone deleteno log');
        console.log(zone);
        console.log('------------------------');
    }).catch(err => res.status(500).send(err));
}


exports.readid = (req, res) => {
    Zone.findOneById(req.params.no).then((zone) => {
        if(!zone) return res.status(404).send({err: 'SE09'});
        res.send(zone);

        console.log('zone readid log');
        console.log(zone);
        console.log('-----------------');
    }).catch(err => res.status(500).send(err));
}

exports.updateid = (req, res) => {
    Zone.updateById(req.params.no, req.body).then((zone) => {
        res.send(zone);

        console.log('zone updateid log');
        console.log(req.body);
        console.log('---------------------');
    }).catch(err => res.status(500).send(err));
}

exports.deleteid = (req, res) => {
    Zone.deleteById(req.params.no).then((zone) => {
        res.sendStatus(200);
        
        console.log('zone deleteid log');
        console.log(zone);
        console.log('------------------------');
    }).catch(err => res.status(500).send(err));
}