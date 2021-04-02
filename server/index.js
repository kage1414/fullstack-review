const express = require('express');
const bodyparser = require('body-parser');
let app = express();
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
      // let counter = 0;
      results.forEach(repo => {
        db.save(repo);
      });
      // for await (let repo of results) {
      //   db.save(repo)
      //     .then(() => {
      //       counter++;
      //       if (counter === results.length) {
      //         return null;
      //       }
      //     });
      // }
      // return null;
    })
    .then(() => {
      db.Repo.
        find({}).
        limit(25).
        sort({ forks: 1 }).
        exec((err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.send(data);
          }
        });
    })
    // .then((repos) => {
    //   res.send(repos);
    // //   let top25 = controller.filterTop25(repos);
    // //   res.send(top25);
    // })
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

