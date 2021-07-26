const { Router } = require('express');
const routes = Router();

const UserController = require('./controllers/UserController');

routes.get('/', UserController.index);

module.exports = routes;
