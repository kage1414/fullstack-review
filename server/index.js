const express = require('express');
const bodyparser = require('body-parser');
let app = express();
const Controller = require('./controller.js');
const controller = new Controller();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

app.post('/repos', controller.reposPost);

app.get('/repos', controller.reposGet);

let port = process.env.PORT;

if (port === null || port === '') {
  port = 1128;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

