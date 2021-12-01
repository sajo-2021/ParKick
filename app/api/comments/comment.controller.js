const Comment = require('../../models/comment');

exports.index = (req, res) => {
    Comment.findAll().then((comments) => {
        if(!comments.length) return res.status(404).send({err: 'SE09'});
        res.send(comments);
    }).catch(err => res.status(500).send(err));
}

exports.readid = (req, res) => {
    Comment.findOneById(req.params.id).then((comment) => {
        if(!comment) return res.status(404).send({err: 'SE09'});
        res.send(comment);
    }).catch(err => res.status(500).send(err));
}

exports.delete = (req, res) => {
    Comment.deleteById(req.params.id).then((comment) => {
        res.sendStatus(200);
    }).catch(err => res.status(500).send(err));
}