import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

//  generic
interface RoleCreationAttrs {
  //поля для создания объекта
  value: string; // роль пользователя ==> admin, user...
  description: string; // описание на русском языке
}

//  generic
@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор " })
  @Column({
    type: DataType.INTEGER, // тип поля INTEGER
    unique: true, // поле должно быть уникальным
    autoIncrement: true, // при каждой записи будет инкриминироваться
    primaryKey: true, // первичный ключ
  })
  id: number;

  @ApiProperty({
    example: "ADMIN",
    description: "Значение роли пользователя",
  })
  @Column({
    type: DataType.STRING, // тип поля INTEGER
    unique: true, // поле должно быть уникальным
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: "Администратор",
    description: "Описание роли",
  })
  @Column({
    type: DataType.STRING, // тип поля STRING
    allowNull: false,
  })
  description: string;
}
