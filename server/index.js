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
      console.log('response', response);
    })
    .catch((err) => {
      console.log(err);
    });
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  console.log('get', req.body);
  // This route should send back the top 25 repos
  res.send('hello');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

