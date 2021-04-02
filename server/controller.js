const helpers = require('../helpers/github');
const db = require('../database/index');

class Controller {

  reposPost(username, callback) {
    return helpers.getReposByUsername(username)
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  reposGet() {
    console.log('- - - - - reposGet - - - -');
    return db.getFindAllPromise();
  }

  filterTop25(repos) {
    console.log('- - - - - filterTop25 - - - -');
    repos.sort((a, b) => {
      if (a.forks > b.forks) {
        return -1;
      }
      if (a.forks < b.forks) {
        return 1;
      }

      return 0;
    });
    return repos.slice(0, 25);
  }

}

module.exports = Controller;