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
  Route.get('/admin', 'AdminsController.index');
  Route.post('/admin', 'AdminsController.store');
  Route.put('/admin/:id', 'AdminsController.update');
  Route.delete('/admin/:id', 'AdminsController.destroy');

  Route.post('/admin/clients', 'AdminActionsController.getClients');
  Route.post('/admin/client/extracts/:id', 'AdminActionsController.getExtracts');
}).middleware(['auth', 'admin']);

//Rota publica teste criar um admin
Route.post('/admin/new', 'AdminsController.store');

//Rotas publicas client
Route.get('/client', 'ClientsController.index');
Route.post('/client', 'ClientsController.store');

// Rotas privadas clients
Route.group(() => {
  Route.post('/client/pix', 'PixController.store');
}).middleware(['auth', 'client']);
