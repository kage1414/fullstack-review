const axios = require('axios');
let TOKEN = process.env.TOKEN;

if (!TOKEN) {
  TOKEN = require('../config.js').TOKEN;
}

let getReposByUsername = (owner) => {
  let options = {
    url: `https://api.github.com/users/${owner}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${TOKEN}`
    },
    method: 'GET'
  };

  return axios(options);
};

module.exports.getReposByUsername = getReposByUsername;