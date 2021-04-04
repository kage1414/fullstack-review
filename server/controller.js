const helpers = require('../helpers/github');
const db = require('../database/index');
const Promise = require('bluebird');

class Controller {

  reposPost(req, res) {
    if (req.body.username) {
      console.log('POST');
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
            .sort({ openIssues: -1 })
            // .sort({ forks: -1 })
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
          res.sendStatus(404);
        });
    } else {
      res.sendStatus(404);
    }
  }

  reposGet(req, res) {
    console.log('POST');
    db.Repo.find({})
      .limit(25)
      .sort({ openIssues: -1 })
      // .sort({ forks: -1 })
      .exec((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
  }

}

module.exports = Controller;