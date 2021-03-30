const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (owner) => {
  let options = {
    url: `https://api.github.com/users/${owner}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    method: 'GET'
  };

  return axios(options);
};

module.exports.getReposByUsername = getReposByUsername;