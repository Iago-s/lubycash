const { Router } = require('express');
const routes = Router();

const ClientController = require('./controllers/ClientController');

routes.get('/', ClientController.index);

module.exports = routes;
