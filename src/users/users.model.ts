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
  @Column({
    type: DataType.INTEGER, // тип поля INTEGER
    unique: true, // поле должно быть уникальным
    autoIncrement: true, // при каждой записи будет инкриминироваться
    primaryKey: true, // первичный ключ
  })
  id: number;

  @Column({
    type: DataType.STRING, // тип поля STRING
    unique: true,
    allowNull: false, // не должен инкриминироваться
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN, // тип поля STRING
    unique: true,
    defaultValue: false, // пользователь изначально не забанен
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN, // тип поля STRING
    unique: true,
    allowNull: false, // пользователь изначально не забанен
  })
  banned: boolean;
}
