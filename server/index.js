const express = require('express');
const bodyparser = require('body-parser');
let app = express();

const Controller = require('./controller');

const controller = new Controller();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

app.post('/repos', function (req, res) {
  controller.reposPost(req.body.username, controller.reposGet()
    .exec((err, repos) => {
      let top25 = controller.filterTop25(repos);
      res.send(top25);
    }));
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

