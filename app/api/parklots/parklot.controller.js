const Parklot = require('../../models/parklot');
const Rate = require('../../models/rate');
const User = require('../../models/user');
const Comment = require('../../models/comment');

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

exports.updateRate = (req, res) => {
    Parklot.findOne({_id: req.body.lotid}).then(parklot => {
        Promise.all([
            User.findOne({
                _id: req.body.userid, 
                'lot_rate_list.lot': req.body.lotid}),
            User.findOne({_id: req.body.userid}),
            User.findOne({
                _id: req.body.userid, 
                'lot_rate_list.lot': req.body.lotid
                }, 'lot_rate_list.$'),
            Rate.findOne({_id: parklot.rate})
        ]).then(([exist, user, lot, rateid]) => {
            console.log('user => ' + parklot);
            console.log('---------------------');
            console.log('user => ' + exist);
            console.log('---------------------');
            console.log('nopark => ' + user);
            console.log('---------------------');
            console.log('lot => ' + lot);
            console.log('---------------------');
            console.log('rateid => ' + rateid);
            console.log('---------------------');
            console.log('rateid.like => ' + rateid.like);
            console.log('---------------------');
            console.log('rateid.dislike => ' + rateid.dislike);
            console.log('---------------------');

    
            if(!exist){ // user가 null이라면
                if(req.body.pmt==1){ // like인 경우
                    user.lot_rate_list.push({lot:req.body.lotid, myrate:1});
                    console.log('push 완료');
                    user.save();
                    console.log('save 완료');

                    rateid.like++;
                    rateid.save();
                }else if(req.body.pmt==2){ //dislike인 경우
                    user.lot_rate_list.push({lot:req.body.lotid, myrate:-1});
                    console.log('push 완료');
                    user.save();
                    console.log('save 완료');

                    rateid.dislike++;
                    rateid.save();
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
                        
                        rateid.like--;
                        rateid.dislike++;
                        rateid.save();
                    }
                }else if(myrate == -1){
                    if(req.body.pmt == 1){
                        console.log('dislike를 like로 변경합니다.');
                        user.lot_rate_list.pull({lot:req.body.lotid, myrate: -1});
                        user.lot_rate_list.push({lot:req.body.lotid, myrate: 1});
                        user.save();
                        
                        rateid.like++;
                        rateid.dislike--;
                        rateid.save();
                    }else if(req.body.pmt == 2){
                        console.log('이미 dislike입니다.');
                    }
                }
            }
        }).catch(err => res.status(500).send(err));
        res.send(parklot);
    }).catch(err => res.status(500).send(err));
}


exports.writeComment = (req, res) => {
    /*
        body로 전달되어야 할 값
        no : lot의 고유 넘버
        user : user의 _id값
        comment : 기록하고자 하는 comment의 내용
    */
    Promise.all([
        Parklot.findOneByParkno(req.body.no),
        Parklot.findOne({
            lotid: req.body.no, 
            'comments.user':req.body.user},
            'comments.$'),
        User.findOneById(req.body.user)
    ]).then(([lot, exist, user]) => {
        console.log('lot => ' + lot);
        console.log('---------------------');
        console.log('exist => ' + exist);
        console.log('---------------------');
        if(exist){
            console.log('exist.comments[0].user => ' + exist.comments[0].user);
            console.log('---------------------');
        }

        console.log('user => ' + user);
        console.log('---------------------');

        let result = "결과 : ";

        if(!lot) {
            console.log('lot is null');
            result += "lot가 null 입니다.";
        }
        else if(!user) {
            console.log('user is null');
            result += "user가 null 입니다.";
        }
        else{
            if(!exist) { // exist가 null이라면 자유롭게 추가해도 됨
                Comment.create({comment: req.body.comment})
                    .then(comment => {                        
                        console.log('comment => ' + comment);
                        console.log('---------------------');

                        user.mycomments.push(comment._id);
                        user.save();
                        lot.comments.push({user: user._id, comment: comment._id});
                        lot.save();

                        
                    }).catch(err => res.status(500).send(err));

                return res.sendStatus(200);
            }
            else{ // exist가 null이 아니라면 추가하면 안됨.
                console.log('이미 댓글을 달았습니다.');
                result += "이미 댓글을 달았습니다.";
            }
        }
        res.send('뭔가 오류가 발생했군요!\n'+result);
    }).catch(err => res.status(500).send(err));
}

exports.updateComment = (req, res) => {
    /*
        body로 전달되어야 할 값
        no : lot의 고유 넘버
        user : user의 _id값
        comment : 수정하고자 하는 comment의 내용
    */
    Promise.all([
        Parklot.findOneByParkno(req.body.no),
        Parklot.findOne({
            lotid: req.body.no, 
            'comments.user':req.body.user},
            'comments.$'),
        User.findOneById(req.body.user)
    ]).then(([lot, exist, user]) => {
        console.log('lot => ' + lot);
        console.log('---------------------');
        console.log('exist => ' + exist);
        console.log('---------------------');
        if(exist){
            console.log('exist.comments[0].user => ' + exist.comments[0].user);
            console.log('---------------------');
        }
        console.log('user => ' + user);
        console.log('---------------------');

        let result = "결과 : ";

        if(!lot) {
            console.log('lot is null');
            result += "lot가 null 입니다.";
        }
        else if(!user) {
            console.log('user is null');
            result += "user가 null 입니다.";
        }
        else{
            if(!exist) { // exist가 null이라면 자유롭게 추가해도 됨
                console.log('아직 댓글을 달지 않았습니다.');
                result += "아직 댓글을 달지 않았습니다.";
                // Comment.create({comment: req.body.comment})
                //     .then(comment => {                        
                //         console.log('comment => ' + comment);
                //         console.log('---------------------');

                //         user.mycomments.push(comment._id);
                //         user.save();
                //         lot.comments.push({user: user._id, comment: comment._id});
                //         lot.save();

                        
                //     }).catch(err => res.status(500).send(err));

                // return res.sendStatus(200);
            }
            else{ // exist가 null이 아니라면 추가하면 안됨.
                Comment.findOneById(exist.comments[0].comment)
                    .then(comment => {
                        comment.comment = req.body.comment;
                        comment.save();
                    }).catch(err => res.status(500).send(err));
            }
        }
        res.send('뭔가 오류가 발생했군요!\n'+result);
    }).catch(err => res.ststus(500).send(err));
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

