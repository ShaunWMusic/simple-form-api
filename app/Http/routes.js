'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.post('/api/pid', 'PidController.store');

Route.resource('/api/pid', 'PidController')
  .only(['index', 'show', 'update', 'destroy']);

// Route.resource('/api/pledges', 'PledgeController')
//   .only(['index', 'show']);

Route.resource('/api/stats', 'StatsController')
  .except(['create', 'edit']);

Route.resource('/api/ae15m', 'AE15mController')
  .except(['create', 'edit']);

// Route.resource('/api/pledges', 'PledgeController')
//   .only(['store', 'update', 'destroy'])
//   .middleware('auth');

Route.post('/api/token-auth', 'SessionController.store');
