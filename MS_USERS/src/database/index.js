const Sequelize = require('sequelize');

const connection = new Sequelize('luby_cash', 'root', '2307', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
});

module.exports = connection;
