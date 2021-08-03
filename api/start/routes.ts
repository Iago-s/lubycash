/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('/user/session', 'SessionsController.store');
Route.post('/user/password', 'ForgotPasswordsController.store');
Route.put('/user/password', 'ForgotPasswordsController.update');

// Rotas privadas admins
Route.group(() => {
  Route.get('/user', 'UsersController.index');
  Route.post('/user', 'UsersController.store');
  Route.put('/user/:id', 'UsersController.update');
  Route.delete('/user/:id', 'UsersController.destroy');

  Route.post('/clients', 'AdminActionsController.getClients');
  Route.post('/client/extracts/:id', 'AdminActionsController.getExtracts');
}).middleware('auth');

//Rotas publicas client
Route.get('/client', 'ClientsController.index');
Route.post('/client', 'ClientsController.store');

// Rotas privadas clients
Route.group(() => {
  Route.post('/client/pix', 'PixController.store');
}).middleware('auth');
