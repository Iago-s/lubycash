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

Route.get('/users', 'UsersController.index');
Route.post('/users', 'UsersController.store');
Route.post('/users/login', 'UserSessionsController.store');
Route.post('/users/passwords', 'UsersForgotPasswordsController.store');
Route.put('/users/passwords', 'UsersForgotPasswordsController.update');

Route.post('/pix', 'UserPixesController.store').middleware('auth:user');

Route.get('/admin', 'AdminsController.index');
Route.post('/admin', 'AdminsController.store');
Route.post('/admins/login', 'AdminSessionsController.store');
Route.post('/admin/passwords', 'AdminsForgotPasswordsController.store');
Route.put('/admin/passwords', 'AdminsForgotPasswordsController.update');

Route.get('/admin/extracts/:id', 'AdminExtractsController.index');
