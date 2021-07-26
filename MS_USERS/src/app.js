const express = require('express');
const app = express();
const routes = require('./routes');

const connection = require('./database');

connection
  .authenticate()
  .then(() => console.log('Database connection success!'))
  .catch(() => console.log('Failed to connect to database!'));

app.use(routes);

module.exports = app;
