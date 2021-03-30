const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id: Number,
  name: String,
  fullName: String,
  owner: String,
  ownerId: Number,
  url: String,
  forks: Number,
  openIssues: Number,
  updatedAt: Date
});

let Repo = mongoose.model('Repo', repoSchema, 'repos');

let save = (repos) => {
  return Repo.bulkWrite(
    repos.map((repo) =>
      ({
        updateOne: {
          filter: { _id: repo.id },
          update: {
            _id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            owner: repo.owner.login,
            ownerId: repo.owner.id,
            url: repo.url,
            forks: repo.forks,
            openIssues: repo.open_issues,
            updatedAt: repo.updated_at
          },
          upsert: true
        }
      }
      ))
  )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

let findAll = () => {
  return Repo.find({})
    .then((repos) => {
      return repos;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.findAll = findAll;

module.exports.save = save;