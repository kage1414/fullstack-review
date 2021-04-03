const axios = require('axios');
const aws = require('aws-sdk');

let getReposByUsername = (owner) => {
  let options = {
    url: `https://api.github.com/users/${owner}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    },
    method: 'GET'
  };

  return axios(options);
};

module.exports.getReposByUsername = getReposByUsername;