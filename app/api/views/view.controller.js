const View = require('../../models/view');

exports.index = (req, res) => {
    View.findAll().then((views) => {
        if(!views.length) return res.status(404).send({err: 'View not found!'});

        res.send(views);
    }).catch(err => res.status(500).send(err));
}

exports.readno = (req, res) => {
    View.findOneByParkno(req.params.no).then((view)=>{
        if(!view) return res.status(404).send({err:'View not found!'});

        res.send(view);

        console.log('View read log');
        console.log(view);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}

exports.readUserid = (req, res) =>{
    View.findByUserid(req.paarams.id).then((views) => {
        if(!views.length) return res.status(404).send({err: 'View not found!'});

        res.send(views);
    }).catch(err => res.status(500).send(err));
}

exports.create = (req, res) => {
    View.create(req.body)
        .then((view) => {
            res.send(view);

            console.log('View create log');
            console.log(view);
            console.log('----------------------');
        }).catch((err) => res.status(500).send(err));
}

exports.update = (req, res) => {
    View.updateByParkno(req.params.no, req.body).then((view) => {
        res.send(view);

        console.log('View update log');
        console.log(req.body);
        console.log('--------------------');
    }).catch(err => res.status(500).send(err));
}

exports.delete = (req, res) => {
    View.deleteByParkno(req.params.no).then((view) => {
        res.sendStatus(200);

        console.log('View delete log');
        console.log(view);
        console.log('-------------------');
    }).catch(err => res.status(500).send(err));
}