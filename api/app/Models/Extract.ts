import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Extract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public type: string

  @column()
  public name_destination: string

  @column()
  public transfer_amount: number

  @column()
  public created_at: Date

  @column()
  public updated_at: Date
}
