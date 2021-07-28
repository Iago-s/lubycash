const Sequelize = require('sequelize');
const connection = require('../index');

const User = connection.define(
  'user',
  {
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
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
    address_number: {
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
    token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    token_created_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

connection.sync({ force: false });

module.exports = User;
