import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @column()
  public full_name: string;

  @column()
  public email: string;

  @column()
  public phone: string;

  @column()
  public cpf_number: string;

  @column()
  public zipcode: string;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public address: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;
}
