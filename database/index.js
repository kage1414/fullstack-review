const Promise = require('bluebird');
const mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});

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

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {

  return Repo.updateOne({ _id: repo.id }, {
    _id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
    ownerId: repo.owner.id,
    url: repo.url,
    forks: repo.forks,
    openIssues: repo.open_issues,
    updatedAt: repo.updated_at
  }, {upsert: true, overwrite: true }).exec();
};

let saveAll = async repos => {

  let promises = repos.map((repo) => {
    return save(repo);
  });
  await Promise.all(promises);
  return;
};

let getFindAllPromise = () => {
  return Repo.find();
  // return query;
};

module.exports.getFindAllPromise = getFindAllPromise;

module.exports.saveAll = saveAll;

module.exports.Repo = Repo;