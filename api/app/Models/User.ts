import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';

import Extract from './Extract';

export default class User extends BaseModel {
  @hasMany(() => Extract, { foreignKey: 'user_id' })
  public extract: HasMany<typeof Extract>

  @column({ isPrimary: true })
  public id: number

  @column()
  public full_name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public phone: string

  @column()
  public cpf_number: string

  @column()
  public zipcode: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public address: string

  @column()
  public address_number: string

  @column()
  public average_salary: number

  @column()
  public current_balance: number

  @column()
  public status: boolean

  @column()
  public token: string | null

  @column()
  public token_created_at: Date | null

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
