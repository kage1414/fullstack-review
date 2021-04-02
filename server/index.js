const express = require('express');
const bodyparser = require('body-parser');
let app = express();
const Promise = require('bluebird');
// const Controller = require('./controller');
// const controller = new Controller();
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
      console.log('saveAll start')
      return db.saveAll(results);
    })
    .then(() => {
      console.log('saveAll end');
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
      console.log('db.Repo.find');
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

app.get('/repos', function (req, res) {
  controller.reposGet()
    .exec((err, repos) => {
      let top25 = controller.filterTop25(repos);
      res.send(top25);
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

