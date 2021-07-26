const Sequelize = require('sequelize');

const connection = new Sequelize('luby_cash', 'root', '2307', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
});

connection
  .authenticate()
  .then(() => console.log('Database connection success!'))
  .catch(() => console.log('Failed to connect to database!'));

module.exports = connection;
