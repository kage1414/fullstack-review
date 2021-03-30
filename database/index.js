const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
  owner: String,
  owner_id: Number,
  url: String,
  forks: Number,
  open_issues: Number,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {

  for (let i = 0; i < repos.length; i++) {
    let currentRepo = repos[i];
    let repo = new Repo({
      id: currentRepo.id,
      name: currentRepo.name,
      full_name: currentRepo.full_name,
      owner: currentRepo.owner.login,
      owner_id: currentRepo.owner.id,
      url: currentRepo.url,
      forks: currentRepo.forks,
      open_issues: currentRepo.open_issues,
      updated_at: currentRepo.updated_at
    });
    repo.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  }

}

module.exports.save = save;