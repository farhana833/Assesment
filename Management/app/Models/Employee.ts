import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number
 
  @column()
  public name: string

  @column ()
  public dob: Date

  @column()
  public doj: Date

  @column()
  public email:string

  @column()
  public phone:bigint

  @column()
  @hasOne(() => Department)
  public department_id: HasOne<typeof Department>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
