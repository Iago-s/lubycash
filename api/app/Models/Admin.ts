import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';

export default class Admin extends BaseModel {
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
  public token: string | null

  @column()
  public token_created_at: Date | null

  @column.dateTime({autoCreate: true})
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword (admin: Admin) {
    if (admin.$dirty.password) {
      admin.password = await Hash.make(admin.password)
    }
  }
}
