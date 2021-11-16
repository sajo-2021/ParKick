const Parklot = require('../../models/parklot');
const Rate = require('../../models/rate');
const User = require('../../models/user');

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
            console.log(req.body.lotid);
            console.log(req.body.longitude);
            console.log('-------------------');
        })
        .catch(err => res.status(500).send(err));
}

exports.readno = (req, res) => {
    Parklot.findOneByParkno(req.params.no).then((lot) => {
            if(!lot) return res.status(404).send({err: 'SE09'});
            res.status(200).send(lot);

            console.log('lot readno log');
            console.log(lot);
            console.log('------------------------');
        }).catch(err => res.status(500).send(err));
}

exports.readid = (req, res) => {
    Parklot.findOneById(req.params.id).then((lot) => {
        if(!lot) return res.status(404).send({err: 'SE09'});
            res.status(200).send(lot);

            console.log('lot readid log');
            console.log(lot);
            console.log('------------------------');
        }).catch(err => res.status(500).send(err));
}

exports.deleteno = (req, res) => {
    Parklot.deleteByParkno(req.params.no).then((lot) => {
            res.sendStatus(200)

            console.log('lot deleteno log');
            console.log(lot);
            console.log('------------------');
        }).catch(err => res.status(500).send(err));
}

exports.deleteid = (req, res) => {
    Parklot.deleteById(req.params.id).then((lot) => {
            res.sendStatus(200)

            console.log('lot deleteid log');
            console.log(lot);
            console.log('------------------');
        }).catch(err => res.status(500).send(err));
}

exports.inclike = (req, res) => {
    Parklot.findById(req.body.lotid, "rate").then(lot => {
        console.log('rateid : ' + lot.rate);
        Rate.incLike(lot.rate).then(rate => {
            console.log(rate);
        }).catch(err => res.status(500).send(err));
        User.incLike(req.body.userid, req.body.lotid, req.body.pmt).then(user => {
            console.log(user);
        }).catch(err => res.status(500).send(err));
        res.sendStatus(200);
    }).catch(err => res.status(500).send(err));
}



exports.incdislike = (req, res) => {
    Parklot.findById(req.params.id, "rate").then(lot => {
        console.log('rateid : ' + lot.rate);
        Rate.incDislike(lot.rate).then(rate => {
            console.log(rate);
            res.send('rate dislike : ' + rate.dislike);
        }).catch(err => res.status(500).send(err));
    }).catch(err => res.status(500).send(err));
}
exports.declike = (req, res) => {
    Parklot.findById(req.params.id, "rate").then(lot => {
        console.log('rateid : ' + lot.rate);
        Rate.decLike(lot.rate).then(rate => {
            console.log(rate);
            res.send('rate like : ' + rate.like);
        }).catch(err => res.status(500).send(err));
    }).catch(err => res.status(500).send(err));
}
exports.decdislike = (req, res) => {
    Parklot.findById(req.params.id, "rate").then(lot => {
        console.log('rateid : ' + lot.rate);
        Rate.decDislike(lot.rate).then(rate => {
            console.log(rate);
            res.send('rate dislike : ' + rate.dislike);
        }).catch(err => res.status(500).send(err));
    }).catch(err => res.status(500).send(err));
}






exports.writecom = (req, res) => {
    Parklot.findOneByParkno(req.params.no).then(lot => {
        if(!lot) return res.status(404).send('SE09');
        lot.addComment(req.params.user, req.body);

        res.send(lot);
    }).catch(err => res.status(500).send(err));
}

exports.updatecom = (req, res) => {
    Parklot.findOneByParkno(req.params.no).then(lot => {
        if(!lot) return res.status(404).send('SE09');
        lot.updateComment(req.params.comid, req.body);
        console.log(lot);

        res.send(lot);
    }).catch(err => res.status(500).send(err));
}

exports.deletecom = (req, res) => {
    Parklot.findOneByParkno(req.params.no).then(lot => {
        if(!lot) return res.status(404).send('SE09');
        lot.comments.pull({'comments.$.comment' : req.params.comid});
        lot.save();

        res.send(lot);
    }).catch(err => res.status(500).send(err));
}

