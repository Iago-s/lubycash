import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Extracts extends BaseSchema {
  protected tableName = 'extracts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client_id').notNullable()
      table.string('type').notNullable()
      table.string('name_destination').notNullable()
      table.float('transfer_amount').notNullable()

      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
