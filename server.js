const express = require('express');
const path = require('path');
const api = require('./routes/api');
const PORT = process.env.port || 3001;



const app = express();

app.use(express.json());
// This object will contain key-value pairs, where the value can be a string or array
app.use(express.urlencoded({ extended: false }));
app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);