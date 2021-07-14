import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

//  generic
@Table({ tableName: "user_roles", createdAt: false, updatedAt: false }) // даты создание createdAt и обновления уст флаг false
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER, // тип поля INTEGER
    unique: true, // поле должно быть уникальным
    autoIncrement: true, // при каждой записи будет инкриминироваться
    primaryKey: true, // первичный ключ
  })
  id: number;

  @ForeignKey(() => Role) //для того чтобы декоратор понимал что это внешний ключ
  @Column({
    type: DataType.INTEGER, // тип поля INTEGER
  })
  roleId: number;

  @ForeignKey(() => User) //для того чтобы декоратор понимал что это внешний ключ
  @Column({
    type: DataType.INTEGER, // тип поля STRING
  })
  userId: number;
}
