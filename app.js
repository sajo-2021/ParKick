const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!\n');
});

app.get('/users', (req, res) => {
    return res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect id'});
    }

    let user = users.filter(user => user.id === id)[0]
    if(!user){
        return res.status(404).json({err: 'Unknown user!'});
    }

    return res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect id'});
    }
    const userIdx = users.findIndex( user => {
        return user.id === id;
    });
    if(userIdx === -1){
        return res.status(404).json({err: 'Unknown user'});
    }
    users.splice(userIdx, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

let users = [
    {
        id: 1,
        name: 'Hyun'
    },
    {
        id: 2,
        name: 'Alice'
    },
    {
        id: 3,
        name: 'Kelly'
    }
]