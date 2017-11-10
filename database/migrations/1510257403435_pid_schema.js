'use strict'

const Schema = use('Schema')

class PidSchema extends Schema {
  up () {
    this.create('pid', (table) => {
      table.increments()
      table.string('pid', 8).notNullable();
      table.string('firstname', 80).notNullable();
      table.string('lastname', 80).notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.string('jobtitle', 80).notNullable();
      table.string('managername', 80).notNullable();
      table.string('city', 80).notNullable();
      table.string('division', 80).notNullable();
      table.string('region', 80).notNullable();
      table.boolean('is_admin').default(true);
      table.boolean('is_approved').default(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('pid')
  }
}

module.exports = PidSchema
