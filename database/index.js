const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id: {type: Number, unique: true, dropDups: true},
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

  for (let i = 0; i < repos.length; i++) {
    let repo = repos[i];

    Repo.find({ _id: repo.id })
      .then((result) => {
        if (result.length > 0) {

          result.forEach((ele) => {

            let existingUpdate = Date.parse(ele._doc.updatedAt);
            let currentUpdate = Date.parse(repo.updated_at);


            if (currentUpdate > existingUpdate) {

              Repo.deleteOne({ _id: ele._doc.id });
              let doc = new Repo({
                _id: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                owner: repo.owner.login,
                ownerId: repo.owner.id,
                url: repo.url,
                forks: repo.forks,
                openIssues: repo.open_issues,
                updatedAt: repo.updated_at
              });

              doc.save();
            }
          });
        } else {
          let doc = new Repo({
            _id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            owner: repo.owner.login,
            ownerId: repo.owner.id,
            url: repo.url,
            forks: repo.forks,
            openIssues: repo.open_issues,
            updatedAt: repo.updated_at
          });
          doc.save();
        }
      });

  }

};

let getFindAllPromise = () => {
  let query = Repo.find();
  return query;
};

module.exports.getFindAllPromise = getFindAllPromise;

module.exports.save = save;