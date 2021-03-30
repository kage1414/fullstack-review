const express = require('express');
const bodyparser = require('body-parser');
let app = express();
const helpers = require('../helpers/github');
const db = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body.username)
    .then((response) => {
      return db.save(response.data);
    })
    .then((response) => {
      res.redirect('/repos');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/repos', function (req, res) {
  let allRepos = db.findAll();
  console.log('all', allRepos);
  // This route should send back the top 25 repos
  res.send(allRepos);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

