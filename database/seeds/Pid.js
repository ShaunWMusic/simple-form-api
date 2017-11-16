'use strict'

const Factory = use('Factory')

class PidSeeder {

  * run () {
  yield Factory.model('App/Model/Pids').create(5)
  }

}

module.exports = PidSeeder
