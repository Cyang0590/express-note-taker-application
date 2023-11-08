const api = require('express').Router();
const fs = require('fs');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid');
const notes = require('../db/db.json');

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
        id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');
    res.json('Notes added succefully');
    } else {
        res.error('Error occured when adding note')
    }
});

api.delete('/notes/:id', (req, res) => {
    console.log(notes);
    for (let i = 0; i < notes.length; i++) {
      if (req.params.id === notes[i].id) {
        notes.splice(i,1)
      };   
    };
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.json(notes);
});


module.exports = api;
