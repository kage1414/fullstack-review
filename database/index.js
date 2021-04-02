// const Promise = require('bluebird');
const mongoose = require('mongoose');
// mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id: {type: Number, unique: true},
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

let save = (repo) => {
  // let start = Date.now();

  // Find

  Repo.find({ _id: repo.id })
    .exec((err, data) => {
      if (data.length > 0) {
        let doc = new Repo(data[0]);
        return doc.save()
          .then((saved) => {
            return saved;
          });
      } else {
        Repo.updateOne({ _id: repo.id }, {
          _id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          owner: repo.owner.login,
          ownerId: repo.owner.id,
          url: repo.url,
          forks: repo.forks,
          openIssues: repo.open_issues,
          updatedAt: repo.updated_at
        }, {upsert: true, overwrite: true })
          .exec((err, numAffected) => {
            // console.log(Date.now() - start);
            return numAffected;
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
    // Response
      // Update
    // No-Response
      // Save

  // Repo.updateOne({ _id: repo.id }, {
  //   _id: repo.id,
  //   name: repo.name,
  //   fullName: repo.full_name,
  //   owner: repo.owner.login,
  //   ownerId: repo.owner.id,
  //   url: repo.url,
  //   forks: repo.forks,
  //   openIssues: repo.open_issues,
  //   updatedAt: repo.updated_at
  // }, {upsert: true, overwrite: true })
  //   .exec((err, numAffected) => {
  //     // console.log(Date.now() - start);
  //     return numAffected;
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });

};

let getFindAllPromise = () => {
  return Repo.find();
  // return query;
};

module.exports.getFindAllPromise = getFindAllPromise;

module.exports.save = save;

module.exports.Repo = Repo;