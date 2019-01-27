const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const router = require('./routes');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);


app.listen(3000, () => console.log('server running on port 3000'));
