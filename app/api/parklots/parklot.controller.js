const Parklot = require('../../models/parklot');
const Rate = require('../../models/rate');
const User = require('../../models/user');
const Comment = require('../../models/comment');

exports.index = (req, res) => {
    Parklot.findAll().then((lots) => {
        if(!lots.length) return res.status(404).send({err: 'SE09'});

        console.log('parklot list read');
        res.send(lots);
    }).catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
    if(req.body.lotid == null || req.body.latitude == null || req.body.longitude == null){
        console.log({err: 'SE01'});
        res.status(400).send({err : 'SE01'})
    }else{
        Parklot.findOne({lotid: req.body.lotid}).then(lot => {
            if(!lot){
                Parklot.create(req.body).then(newlot => {
                    console.log('new parklot create');
                    return res.send(newlot);
                }).catch(err => console.log(err))
            }else{
                console.log('lotid is exist');
                return res.status(400).send({err: 'SE06'});
            }
        }).catch(err => res.status(500).send(err))
    }
}

exports.readno = (req, res) => {
    Parklot.findOneByParkno(req.params.no).then((lot) => {
            if(!lot) return res.status(404).send({err: 'SE09'});
            console.log('lotid '+lot.lotid+' parklot read');
            res.send(lot);
        }).catch(err => res.status(500).send(err));
}

exports.readid = (req, res) => {
    Parklot.findOneById(req.params.oid).then((lot) => {
        if(!lot) return res.status(404).send({err: 'SE09'});
            console.log('lotid '+lot.lotid+' parklot read');
            res.send(lot);
        }).catch(err => res.status(500).send(err));
}

exports.deleteno = (req, res) => {
    // 먼저 해당 parklot과 연결된 rate와 모든 comment를 삭제하여야 한다.
    // report는 유저에게 아무런 기록도 남기지 않으니 그냥 지워도 된다.
    Parklot.findOneAndDelete({lotid: req.params.no}).then(parklot => {
        let parklotid = parklot._id;
        // comment 개수와 ratelist 개수
        let clength = parklot.comments.length;
        let rlength = parklot.ratelist.length;

        for(let i=0; i < clength; i++){
            // comment를 순회하면서 사용자와 코멘트의 _id를 체크
            let userid = parklot.comments[i].user;
            let comid = parklot.comments[i].comment;

            // user._id로 해당 유저를 찾고 
            // mycomment Array에서 해당 comment의 _id를 삭제한다.
            User.findOneById(userid).then(user => {
                user.mycomments.pull(comid);
                user.save();
            }).catch(err => console.log(err));
            
            // 이후 해당 코멘트 삭제
            Comment.deleteOne({_id: comid}).then()
                .catch(err => console.log(err));
        }
        for(let i=0; i < rlength; i++){
            // ratelist를 순회하면서 해당 parklot을 평가한 user를 확인
            let userid = parklot.ratelist[i];

            // 해당 user의 lot_rate_list에서 해당 parklot의 요소 제거
            User.findOne({_id: userid, 'lot_rate_list.lot':parklotid}).then(user => {
                let mrate = user.lot_rate_list[0].myrate;
                user.lot_rate_list.pull({lotid: parklotid, myrate: mrate});
                user.save();
            })
        }

        // 연결된 rate 제거
        Rate.deleteOne({_id: parklot.rate}).then()
            .catch(err => console.log(err));

        console.log('parklot delete');
        res.sendStatus(200);
    }).catch(err => res.status(500).send(err));
}

exports.deleteid = (req, res) => {
    Parklot.findOneAndDelete({lotid: req.params.oid}).then(parklot => {
        let parklotid = parklot._id;
        let clength = parklot.comments.length;
        let rlength = parklot.ratelist.length;

        for(let i=0; i < clength; i++){
            let userid = parklot.comments[i].user;
            let comid = parklot.comments[i].comment;

            User.findOneById(userid).then(user => {
                user.mycomments.pull(comid);
                user.save();
            }).catch(err => console.log(err));
            
            Comment.deleteOne({_id: comid}).then()
                .catch(err => res.status(500).send(err));
        }
        for(let i=0; i < rlength; i++){
            let userid = parklot.ratelist[i];

            User.findOne({_id: userid, 'lot_rate_list.lot':parklotid}).then(user => {
                let mrate = user.lot_rate_list[0].myrate;
                user.lot_rate_list.pull({lotid: parklotid, myrate: mrate});
                user.save();
            })
        }
        Rate.deleteOne({_id: parklot.rate}).then()
            .catch(err => console.log(err));

        console.log('parklot delete');
        res.sendStatus(200);
    }).catch(err => res.status(500).send(err));
}

// parklot 평가하기
exports.updateRate = (req, res) => {
    /*
        body로 전달되어야 할 값
        oid : lot의 _id
        pmt : 평가값, 1은 like, 2는 dislike
    */
    // 우선 해당 oid와 일치하는 parklot 조회
    const {oid, pmt} = req.body;
    const uid = req.decoded._id;


    if(oid == null | uid == null | pmt == null){
        console.log({err: 'SE01'});
        res.status(400).send({err : 'SE01'});
    }else{
        Parklot.findOne({_id: oid}).then(parklot => {
            let result = "";
            if(!parklot){
                result += "SE05"
                console.log({err: result});
                return res.status(400).send({err: result});
            }else{
                Promise.all([
                    User.findOne({
                        _id: uid, 
                        'lot_rate_list.lot': oid}),
                    User.findOne({_id: uid}),
                    User.findOne({
                        _id: uid, 
                        'lot_rate_list.lot': oid
                        }, 'lot_rate_list.$'),
                    Rate.findOneById(parklot.rate)
                ]).then(([exist, user, lot, rateid]) => {
                    if(!user){
                        result += "SE05";
                        console.log({err: result});
                        return res.status(400).send({err: result});
                    }else{
                        if(!exist){
                            // 해당 user가 parklot에 평가한 적이 없을 경우
                            if(req.body.pmt==1){ // like인 경우
                                user.lot_rate_list.push({lot:oid, myrate:1});
                                rateid.like++;
                            }else if(req.body.pmt==2){ //dislike인 경우
                                user.lot_rate_list.push({lot:oid, myrate:-1});
                                rateid.dislike++;
                            }else{
                                result += "SE05";
                                console.log({err: result});
                                return res.status(400).send({err: result});
                            }
                            parklot.ratelist.push(uid);
                        }else{
                            // 해당 user가 parklot을 평가했을 경우
                            let myrate = lot.lot_rate_list[0].myrate;
                            // 평가가 무엇인지 확인
                            if(myrate == 1){
                                if(req.body.pmt == 1){
                                    // like 취소
                                    user.lot_rate_list.pull({lot: oid, myrate: 1});
                                    user.lot_rate_list.push({lot: oid, myrate: 0});
                                    
                                    rateid.like--;
                                }else if(req.body.pmt == 2){
                                    // like를 dislike로 변경
                                    user.lot_rate_list.pull({lot: oid, myrate: 1});
                                    user.lot_rate_list.push({lot: oid, myrate: -1});
                                    
                                    rateid.like--;
                                    rateid.dislike++;
                                }else{
                                    result += "SE05";
                                    console.log({err: result});
                                    return res.status(400).send({err: result});
                                }
                            }else if(myrate == -1){
                                if(req.body.pmt == 1){
                                    // dislike를 like로 변경
                                    user.lot_rate_list.pull({lot: oid, myrate: -1});
                                    user.lot_rate_list.push({lot: oid, myrate: 1});
                                    
                                    rateid.like++;
                                    rateid.dislike--;
                                }else if(req.body.pmt == 2){
                                    // dislike 취소
                                    user.lot_rate_list.pull({lot: oid, myrate: -1});
                                    user.lot_rate_list.push({lot: oid, myrate: 0});
                                    
                                    rateid.dislike--;
                                }else{
                                    result += "SE05";
                                    console.log({err: result});
                                    return res.status(400).send({err: result});
                                }
                            }else if(myrate == 0){
                                if(req.body.pmt == 1){
                                    // like로 평가
                                    user.lot_rate_list.pull({lot: oid, myrate: 0});
                                    user.lot_rate_list.push({lot: oid, myrate: 1});
                                    
                                    rateid.like++;
                                }else if(req.body.pmt == 2){
                                    // dislike로 평가
                                    user.lot_rate_list.pull({lot: oid, myrate: 0});
                                    user.lot_rate_list.push({lot: oid, myrate: -1});
                                    
                                    rateid.dislike++;
                                }else{
                                    result += "SE05";
                                    console.log({err: result});
                                    return res.status(400).send({err: result});
                                }
                            }
                        }
                        // 모든 수정사항 저장
                        user.save();
                        rateid.save();
                        parklot.save();
                        console.log('parklot rate updated');
                        return res.send(rateid);
                    }
                    
                }).catch(err => res.status(500).send(err));
            }
        }).catch(err => res.status(500).send(err));
    }
}

exports.readComment = (req, res) => {
    if(req.params.oid == null){
        console.log({err: 'SE01'});
        res.status(400).send({err : 'SE01'});
    }else{
        Parklot.findOneById(req.params.oid).then(parklot => {
            if(!parklot) return res.status(404).send({err : 'SE09'});

            console.log('lotid '+parklot.lotid+' parklot comment read');
            res.send(parklot.comments);
        }).catch(err => res.status(500).send(err))
    }
}

// exports.writeComment = (req, res) => {
//     /*
//         body로 전달되어야 할 값
//         oid : lot의  _id값
//         uid : user의 _id값
//         comment : 기록하고자 하는 comment의 내용
//     */
//     if(req.body.oid == null || req.body.uid == null){
//         console.log({err: 'SE01'});
//         res.status(400).send({err : 'SE01'});
//     }else{
//         Promise.all([
//             Parklot.findOne({_id: req.body.oid}),
//             Parklot.findOne({
//                 _id: req.body.oid, 
//                 'comments.user':req.body.uid},
//                 'comments.$'),
//             User.findOneById(req.body.uid)
//         ]).then(([lot, exist, user]) => {
//             let result = "";

//             if(!lot) {
//                 result += "SE05";
//             }
//             else if(!user) {
//                 result += "SE05";
//             }
//             else{
//                 if(!exist) { // exist가 null이라면 자유롭게 추가해도 됨
//                     Comment.create({comment: req.body.comment})
//                         .then(comment => {
//                             user.mycomments.push(comment._id);
//                             user.save();
//                             lot.comments.push({user: user._id, comment: comment._id});
//                             lot.save();
//                         }).catch(err => res.status(500).send(err));

//                     console.log('lotid '+lot.lotid+' parklot comment write');
//                     return res.sendStatus(200);
//                 }
//                 else{ // exist가 null이 아니라면 추가하면 안됨.
//                     result += "SE06";
//                 }
//             }
//             console.log({err: result});
//             res.status(400).send({err : result});
//         }).catch(err => res.status(500).send(err));
//     }
// }

exports.updateComment = (req, res) => {
    /*
        body로 전달되어야 할 값
        oid : lot의  _id값
        comment : 기록하고자 하는 comment의 내용
    */
    const {oid, com} = req.body;
    const uid = req.decoded._id;

    if(oid == null || uid == null){
        console.log({err: 'SE01'});
        res.status(400).send({err : 'SE01'});
    }else{
        Promise.all([
            Parklot.findOne({_id: oid}),
            Parklot.findOne({
                _id: oid, 
                'comments.user':uid},
                'comments.$'),
            User.findOneById(uid)
        ]).then(([lot, exist, user]) => {
            let result = "";

            if(!lot) {
                result += "SE05";
            }
            else if(!user) {
                result += "SE05";
            }
            else{
                if(!exist) { // exist가 null이라면 수정 불가능
                    Comment.create({comment: com})
                        .then(comment => {
                            user.mycomments.push({lot: oid, comment: comment._id});
                            user.save();
                            lot.comments.push({user: uid, comment: comment._id});
                            lot.save();
                        }).catch(err => res.status(500).send(err));

                    console.log('lotid '+lot.lotid+' parklot comment write');
                    return res.sendStatus(200);
                }else{ // exist가 null이 아니라면 검색 후 수정
                    Comment.findOneById(exist.comments[0].comment)
                        .then(comment => {
                            comment.comment = com;
                            comment.save();
                        }).catch(err => console.log(err));
                    
                    console.log('lotid '+lot.lotid+' parklot comments updated');
                    return res.sendStatus(200); 
                }
            }
            console.log({err: result});
            res.status(400).send({err : result});
        }).catch(err => res.ststus(500).send(err));
    }
}

exports.deleteComment = (req, res) => {
    /*
        params로 전달되어야 할 값
        oid : lot의 _id값
    */
    const oid = req.params.oid;
    const uid = req.decoded._id;

    if(oid == null || uid == null){
        console.log({err: 'SE01'});
        res.status(400).send({err : 'SE01'});
    }else{
        Promise.all([
            Parklot.findOne({_id: oid}),
            Parklot.findOne({
                _id: oid, 
                'comments.user':uid},
                'comments.$'),
            User.findOneById(uid)
        ]).then(([lot, exist, user]) => {
            let result = "";

            if(!lot) {
                result += "SE05";
            }
            else if(!user) {
                result += "SE05";
            }
            else{
                if(!exist) { // exist가 null이면 삭제불가능
                    result += "SE07";
                }
                else{ // 댓글이 존재하므로 삭제
                    lot.comments.pull({user: uid, comment: exist.comments[0].comment})
                    lot.save();
                    user.mycomments.pull({lot: oid, comment: exist.comments[0].comment});
                    user.save();

                    Comment.deleteById(exist.comments[0].comment)
                        .then().catch(err => console.log(err));

                    console.log('lotid '+lot.lotid+' parklot comment delete');
                    return res.sendStatus(200); 
                }
            }
            console.log({err: result});
            res.status(400).send({err : result});
        }).catch(err => res.status(500).send(err));
    }
}

exports.rptLot = (req, res) => {
    /*
        body로 전달되어야 할 값
        oid : lot의 _id값
        uid : user의 _id값
    */
    const {oid} = req.body;
    const uid = req.decoded._id;
    if(oid == null || uid == null){
        console.log({err: 'SE01'});
        res.status(400).send({err : 'SE01'});
    }else{
        Promise.all([
            Parklot.findOne({_id: oid, 'reportlist': uid}),
            Parklot.findOne({_id: oid}),
            User.findOneById(uid)
        ]).then(([exist, parklot, user]) => {
            result = "";
            if(!parklot){
                result += "SE05";
            }else if(!user){
                result += "SE05";
            }else{
                if(!exist){
                    parklot.report++;
                    parklot.reportlist.push(uid);
                    parklot.save();
                }else{
                    parklot.report--;
                    parklot.reportlist.pull(uid);
                    parklot.save();
                }
                console.log('lotid '+parklot.lotid+' parklot report updated');
                return res.send(parklot);
            }
            console.log({err: result});
            res.status(400).send({err: result});
        }).catch(err => res.status(500).send(err));
    }
}