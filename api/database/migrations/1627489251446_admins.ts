import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Admins extends BaseSchema {
  protected tableName = 'admins'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('full_name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('phone').notNullable()
      table.string('cpf_number').notNullable()
      table.string('zipcode').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('address').notNullable()
      table.string('address_number').notNullable()
      table.string('token')
      table.timestamp('token_created_at', { useTz: true })

      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
