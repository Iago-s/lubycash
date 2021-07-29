import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AdminTokens extends BaseSchema {
  protected tableName = 'admin_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('admin_id').unsigned().references('id').inTable('admins').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('token', 64).notNullable().unique()

      table.timestamp('expires_at', { useTz: true }).nullable()

      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
