const express = require('express');
const app = express();
const routes = require('./routes');

require('./database');

app.use(routes);

module.exports = app;
