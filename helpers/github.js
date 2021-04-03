const axios = require('axios');
const aws = require('aws-sdk');

let s3 = new aws.S3({
  accessKeyId: process.env.TOKEN,
});
console.log('- - - - - - - - - - - - - -');
console.log('s3', s3.accessKeyId);
console.log('- - - - - - - - - - - - - -');

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