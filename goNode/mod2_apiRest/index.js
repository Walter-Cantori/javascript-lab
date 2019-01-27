const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const envPath = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

require('dotenv').config({ path: envPath });

const dbConfig = require('./config/databse');

mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());

app.use('/api', require('./app/routes'));


app.listen(3000);

module.exports = app;
