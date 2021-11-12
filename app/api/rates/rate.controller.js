const Rate = require('../../models/rate');

exports.index = (req, res) => {
    Rate.findAll().then((rates) => {
        if(!rates.length) return res.status(404).send({err: 'SE09'});

        res.send(rates);
    }).catch(err => res.status(500).send(err));
}

exports.readno = (req, res) => {
    Rate.findOneByParkno(req.params.no).then((rate)=>{
        if(!rate) return res.status(404).send({err:'SE09'});

        res.send(rate);

        console.log('Rate read log');
        console.log(rate);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}

exports.create = (req, res) => {
    Rate.create(req.body)
        .then((rate) => {
            res.send(rate);

            console.log('Rate create log');
            console.log(rate);
            console.log('----------------------');
        }).catch((err) => res.status(500).send(err));
}

exports.updateno = (req, res) => {
    Rate.updateByParkno(req.params.no, req.body).then((rate) => {
        res.send(rate);

        console.log('Rate update log');
        console.log(req.body);
        console.log('--------------------');
    }).catch(err => res.status(500).send(err));
}

exports.deleteno = (req, res) => {
    Rate.deleteByParkno(req.params.no).then((rate) => {
        res.sendStatus(200);

        console.log('Rate delete log');
        console.log(rate);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}

exports.readid = (req, res) => {
    Rate.findOneById(req.params.id).then((rate)=>{
        if(!rate) return res.status(404).send({err:'SE09'});

        res.send(rate);

        console.log('Rate read log');
        console.log(rate);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}

exports.updateid = (req, res) => {
    Rate.updateById(req.params.id, req.body).then((rate) => {
        res.send(rate);

        console.log('Rate update log');
        console.log(req.body);
        console.log('--------------------');
    }).catch(err => res.status(500).send(err));
}

exports.deleteid = (req, res) => {
    Rate.deleteById(req.params.id).then((rate) => {
        res.sendStatus(200);

        console.log('Rate delete log');
        console.log(rate);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}