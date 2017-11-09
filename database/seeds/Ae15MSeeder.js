'use strict'

/*
|--------------------------------------------------------------------------
| Ae15MSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class Ae15MSeeder {
  async run () {
     Factory.model('App/Model/Pid').create(5)
  }
}

module.exports = Ae15MSeeder
