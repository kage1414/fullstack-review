const express = require('express');
const bodyparser = require('body-parser');
let app = express();
const Promise = require('bluebird');
const db = require('../database/index');
const helpers = require('../helpers/github');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body.username)
    .then((response) => {
      return response.data;
    })
    .then((results) => {
      return db.saveAll(results);
    })
    .then(() => {
      db.Repo.find({})
        .limit(25)
        .sort({ forks: -1 })
        .exec((err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.send(data);
          }
        });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

app.get('/repos', function (req, res) {
  db.Repo.find({})
    .limit(25)
    .sort({ forks: -1 })
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

