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

Route.get('/', async () => {
  return { hello: 'world' }
});

Route.post('/client', 'ClientsController.store');

Route.post('/session', 'SessionsController.store');

Route.get('/users', 'UsersController.index');
Route.post('/users', 'UsersController.store');
Route.post('/users/passwords', 'UsersForgotPasswordsController.store');
Route.put('/users/passwords', 'UsersForgotPasswordsController.update');

Route.group(() => {
  Route.put('/users', 'UsersController.update');
  Route.delete('/users/:id', 'UsersController.destroy');
  Route.post('/users/pix', 'UserPixesController.store');
}).middleware('auth:user');

Route.get('/admins', 'AdminsController.index');
Route.post('/admins/passwords', 'AdminsForgotPasswordsController.store');
Route.put('/admins/passwords', 'AdminsForgotPasswordsController.update');

Route.group(() => {
  Route.post('/admins', 'AdminsController.store');
  Route.put('/admins', 'AdminsController.update');
  Route.delete('/admins/:id', 'AdminsController.destroy');
  Route.get('/admins/extracts/:id', 'AdminActionsController.getExtracts');
  Route.get('/admins/users', 'AdminActionsController.getUsers');
}).middleware('auth:admin');
