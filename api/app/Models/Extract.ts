import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import User from './User'

export default class Extract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => User)
  public extract: HasOne<typeof User>

  @column()
  public user_id: number

  @column()
  public type: string

  @column()
  public name_destination: string

  @column()
  public transfer_amount: number

  @column()
  public createdAt: Date

  @column()
  public updatedAt: Date
}
