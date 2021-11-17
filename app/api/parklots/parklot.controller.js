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
    // Parklot.findById(req.body.lotid, "rate").then(lot => {
    //     console.log('rateeid : ' + lot.rate);
    //     Rate.incLike(lot.rate).then(rate => {
    //         console.log('rate.inclike의 리턴 : '+rate);
    //     }).catch(err => res.status(500).send(err));
    // }).catch(err => res.status(500).send(err));
    
    //User.incLike(req.body.userid, rq.body.lotid, req.body.pmt);
    Parklot.findById(req.body.lotid).then(parklot => {
        Promise.all([
            User.findOne({
                _id: req.body.userid, 
                'lot_rate_list.lot': req.body.lotid}),
            User.findOne({_id: req.body.userid}),
            User.findOne({
                _id: req.body.userid, 
                'lot_rate_list.lot': req.body.lotid
                }, 'lot_rate_list.$'),
            Rate.findOne(parklot.rate)
        ]).then(([exist, user, lot, rateid]) => {
            console.log('user => ' + exist);
            console.log('---------------------');
            console.log('nopark => ' + user);
            console.log('---------------------');
            console.log('lot => ' + lot);
            console.log('---------------------');
            console.log('rateid => ' + rateid);
            console.log('---------------------');
    
            if(!exist){ // user가 null이라면
                if(req.body.pmt==1){ // like인 경우
                    user.lot_rate_list.push({lot:req.body.lotid, myrate:1});
                    console.log('push 완료');
                    user.save();
                    console.log('save 완료');
                    rateid.updateOne({$inc: {like: 1}}, {new: true})
                        .then(r => console.log(r))
                        .catch(err => console.log(err));
                }else if(req.body.pmt==2){ //dislike인 경우
                    user.lot_rate_list.push({lot:req.body.lotid, myrate:-1});
                    console.log('push 완료');
                    user.save();
                    console.log('save 완료');
                    rateid.updateOne({$inc: {dislike: 1}}, {new: true})
                        .then(r => console.log(r))
                        .catch(err => console.log(err));
                }
            }else{
                console.log('user는 null이 아닙니다.');
                let myrate = lot.lot_rate_list[0].myrate;
                console.log('myrate : ' + myrate);
                if(myrate == 1){
                    if(req.body.pmt == 1){
                        console.log('이미 like입니다.');
                    }else if(req.body.pmt == 2){
                        console.log('like를 dislike로 변경합니다.');
                        user.lot_rate_list.pull({lot:req.body.lotid, myrate: 1});
                        user.lot_rate_list.push({lot:req.body.lotid, myrate: -1});
                        user.save();
                        rateid.updateOne({$inc: {like: -1, dislike: 1}}, {new: true})
                            .then(r => console.log(r))
                            .catch(err => console.log(err));
                    }
                }else if(myrate == -1){
                    if(req.body.pmt == 1){
                        console.log('dislike를 like로 변경합니다.');
                        user.lot_rate_list.pull({lot:req.body.lotid, myrate: -1});
                        user.lot_rate_list.push({lot:req.body.lotid, myrate: 1});
                        user.save();
                        rateid.updateOne({$inc: {like: 1, dislike: -1}}, {new: true})
                            .then(r => console.log(r))
                            .catch(err => console.log(err));
                    }else if(req.body.pmt == 2){
                        console.log('이미 dislike입니다.');
                    }
                }
            }
        }).catch(err => res.status(500).send(err));
        res.send(parklot);
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

