'use strict'

const Schema = use('Schema')

class StatsTableSchema extends Schema {

  up () {
    this.create('stats', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('stats')
  }

}

module.exports = StatsTableSchema
