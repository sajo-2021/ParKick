const Comment = require('../../models/comment');

exports.index = (req, res) => {
    Comment.create().then((comments) => {
        if(!comments.length) return res.status(404).send('SE09');
        res.send(comments);
    }).catch(err => res.status(500).send(err));
}

exports.create = (req, res) => {
    Comment.create(req.body).then((comment) => {
        res.send(comment);

        console.log('comment create log');
        console.log(req.body);
        console.log('-------------------------');
    }).catch(err => res.status(500).send(err));
}

exports.readid = (req, res) => {
    Comment.findOneById(req.params.id).then((comment) => {
        if(!comment) return res.status(404).send('SE09');
        res.send(comment);

        console.log('comment readid log');
        console.log(comment);
        console.log('---------------------------');
    }).catch(err => res.status(500).send(err));
}

exports.update = (req, res) => {
    Comment.updateById(req.params.id, req.body).then((comment) => {
        res.send(comment);

        console.log('comment update log');
        console.log(`id: ${req.params.id}`);
        console.log(req.body);
        console.log('---------------------');
    }).catch(err => res.status(500).send(err));
}

exports.delete = (req, res) => {
    Comment.deleteById(req.params.id).then((comment) => {
        res.sendStatus(200);

        console.log('comment delete log');
        console.log(comment);
        console.log('-----------------------');
    })
}