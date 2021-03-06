const express = require('express');
const app = (express());
const PORT = 3333;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/index');

app.use(bodyParser());
app.use(cors());

app.use((req, res, next) => {
  console.log(`serving a ${req.method} request at ${new Date} to url ${req.url}`)
  next();
})

app.get('/associatedVideos', (req, res) => {
  let id = req.query.movieID;

  db.getMovieData(id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('db query successful! results: ', results);
      res.statusCode = 200;
      res.json(results);
    }
  })
})

app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/*', express.static(__dirname + '/../client/dist/index.html'));

app.listen(PORT, () => {
  console.log(`Server active! Listening on port ${PORT}.`)
})
