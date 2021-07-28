import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
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

  @column()
  public created_at: Date

  @column()
  public updated_at: Date
}
