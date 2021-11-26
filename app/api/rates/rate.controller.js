const Rate = require('../../models/rate');

exports.index = (req, res) => {
    Rate.findAll().then((rates) => {
        if(!rates.length) return res.status(404).send({err: 'SE09'});

        res.send(rates);
    }).catch(err => res.status(500).send(err));
}


exports.read = (req, res) => {
    Rate.findOneById(req.params.id).then((rate)=>{
        if(!rate) return res.status(404).send({err:'SE09'});

        res.send(rate);

        console.log('Rate read log');
        console.log(rate);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}

exports.delete = (req, res) => {
    Rate.deleteById(req.params.id).then((rate) => {
        res.sendStatus(200);

        console.log('Rate delete log');
        console.log(rate);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}