'use strict'

const Schema = use('Schema')

class PidSchema extends Schema {
  up () {
    this.create('pids', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('pids')
  }
}

module.exports = PidSchema
