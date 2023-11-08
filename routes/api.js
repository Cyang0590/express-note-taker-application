const api = require('express').Router();
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid');

api.get('/notes', (req, res) => {
    readFromFile('./db/db.json', 'utf8').then((data) => res.json(JSON.parse(data)));
});

api.post('/notes', (req, res) => {
    console.log(req.body);
    
    const { title, text } = req.body;

    if (req.body) {
    const newNotes = {
        title,
        text,
        note_id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');
    res.json('Notes added succefully');
    } else {
        res.error('Error occured when adding note')
    }
});

api.delete('/notes/:id', (req, res) => {

});


module.exports = api;
