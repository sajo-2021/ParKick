const Parklot = require('../../models/parklot');

exports.index = (req, res) => {
    Parklot.findAll().then((lots) => {
        if(!lots.length) return res.status(404).send({err: 'SE09'});
        res.send(lots);

        console.log('lot list log');
        console.log(lots);
        console.log('---------------');
    }).catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
    Parklot.create(req.body)
        .then(lot => {
            res.send(lot)
            
            console.log('lot create log');
            console.log(req.body);
            console.log('-------------------');
        })
        .catch(err => res.status(500).send(err));
}

exports.readno = (req, res) => {
    Parklot.findOneByParkno(req.params.no).then((lot) => {
            if(!lot) return res.status(404).send({err: 'SE09'});
            res.status(200).send(lot);

            console.log('lot read log');
            console.log(lot);
            console.log('------------------------');
        }).catch(err => res.status(500).send(err));
}

exports.updateno = (req, res) => {
    Parklot.updateByParkno(req.params.no, req.body).then((lot) => {
            res.send(lot)
            
            console.log('lot update log');
            console.log(`no: ${req.params.no}`);
            console.log(req.body);
            console.log('-------------------');
        }).catch(err => res.status(500).send(err));
}

exports.deleteno = (req, res) => {
    Parklot.deleteByParkno(req.params.no).then((lot) => {
            res.sendStatus(200)

            console.log('lot delete log');
            console.log(lot);
            console.log('------------------');
        }).catch(err => res.status(500).send(err));
}

exports.readid = (req, res) => {
    Parklot.findOneById(req.params.id).then((lot) => {
        if(!lot) return res.status(404).send({err: 'SE09'});
            res.status(200).send(lot);

            console.log('lot read log');
            console.log(lot);
            console.log('------------------------');
        }).catch(err => res.status(500).send(err));
}

exports.updateid = (req, res) => {
    Parklot.updateById(req.params.id, req.body).then((lot) => {
            res.send(lot)
            
            console.log('lot update log');
            console.log(`no: ${req.params.no}`);
            console.log(req.body);
            console.log('-------------------');
        }).catch(err => res.status(500).send(err));
}

exports.deleteid = (req, res) => {
    Parklot.deleteById(req.params.id).then((lot) => {
            res.sendStatus(200)

            console.log('lot delete log');
            console.log(lot);
            console.log('------------------');
        }).catch(err => res.status(500).send(err));
}
