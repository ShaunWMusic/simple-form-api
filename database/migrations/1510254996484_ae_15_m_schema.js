'use strict'

const Schema = use('Schema')

class Ae15MSchema extends Schema {
  up () {
    this.create('ae_15_ms', (table) => {
      table.increments()
      table.string('name', 80).notNullable();
      table.integer('fullyear', 80).notNullable();
      table.string('division', 80).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('ae_15_ms')
  }
}

module.exports = Ae15MSchema
