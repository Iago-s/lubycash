const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const Consumer = require('./KafkaServices/Consumer');

require('./database');

const consumer = new Consumer('group_users');
consumer.consume('users');

app.use(cors());
app.use(routes);

module.exports = app;
