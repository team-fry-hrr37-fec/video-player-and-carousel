const express = require('express');
const app = (express());
const PORT = 3333;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/index');

app.use(bodyParser());
app.use(cors());

app.use((req, res, next) => {
  console.log(`serving a ${req.method} request at ${new Date}. Body: ${JSON.stringify(req.body)}`)
  next();
})

app.get('/', (req, res) => {
  res.send('hello buddy');
})

app.get('/associatedVideos', (req, res) => {
  let id = req.query.movieID.toString();

  db.getMovieData(id, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.statusCode = 200;
      res.json(results);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server active! Listening on port ${PORT}.`)
})
