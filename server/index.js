const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const Controller = require('./controller.js');
const controller = new Controller();
const path = require('path');

const filePath = path.join(__dirname, '/../client/dist');
console.log('filePath', filePath);

app.use('/', express.static(filePath));
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

app.post('/repos', controller.reposPost);

app.get('/repos', controller.reposGet);

let port = process.env.PORT;

if (port === null || port === '' || port === undefined) {
  port = 1128;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

