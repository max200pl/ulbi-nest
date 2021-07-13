import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

//  generic
interface UserCreationAttrs {
  //поля для создания объекта
  email: string;
  password: string;
}

//  generic
@Table({ tableName: "users" })
export class User extends Model<User> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор " })
  @Column({
    type: DataType.INTEGER, // тип поля INTEGER
    unique: true, // поле должно быть уникальным
    autoIncrement: true, // при каждой записи будет инкриминироваться
    primaryKey: true, // первичный ключ
  })
  id: number;
  @ApiProperty({
    example: "user@mail.ru",
    description: "Почтовый ящик",
  })
  @Column({
    type: DataType.STRING, // тип поля STRING
    unique: true,
    allowNull: false, // не должен инкриминироваться
  })
  email: string;
  @ApiProperty({
    example: "12345",
    description: "Пароль пользователя",
  })
  @Column({
    type: DataType.BOOLEAN, // тип поля STRING
    unique: true,
    defaultValue: false, // пользователь изначально не забанен
  })
  password: string;
  @ApiProperty({
    example: "true",
    description: "Забанен пользователь или нет",
  })
  @Column({
    type: DataType.BOOLEAN, // тип поля STRING
    unique: true,
    allowNull: false, // пользователь изначально не забанен
  })
  banned: boolean;
  @ApiProperty({
    example: "За хулиганство",
    description: "Причина блокировки",
  })
  @Column({
    type: DataType.BOOLEAN, // тип поля STRING
    unique: true,
    allowNull: true, // пользователь изначально не забанен
  })
  banReason: string;
}
