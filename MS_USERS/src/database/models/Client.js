const Sequelize = require('sequelize');
const connection = require('../index');

const Client = connection.define('client', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  average_salary: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  current_balance: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

connection.sync({ force: false });

module.exports = Client;
