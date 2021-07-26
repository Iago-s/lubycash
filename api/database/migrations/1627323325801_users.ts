import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name')
      table.string('email')
      table.string('password')
      table.string('phone')
      table.string('cpf_number')
      table.string('zipcode')
      table.string('city')
      table.string('state')
      table.string('address')
      table.string('address_number')
      table.float('average_salary')
      table.float('current_balance')
      table.boolean('status')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}