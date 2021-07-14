import { Role } from "./../roles/roles.model";
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { UserRoles } from "src/roles/user-roles.module";
import { User } from "src/users/users.model";

//  generic
interface PostCreationAttrs {
  //поля для создания объекта
  title: string;
  content: string;
  userId: number;
  image: string;
}

//  generic
@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER, // тип поля INTEGER
    unique: true, // поле должно быть уникальным
    autoIncrement: true, // при каждой записи будет инкриминироваться
    primaryKey: true, // первичный ключ
  })
  id: number;

  @Column({
    type: DataType.BOOLEAN, // тип поля STRING
    unique: true,
    defaultValue: false, // пользователь изначально не забанен
  })
  title: string; // название поста
  @Column({
    type: DataType.BOOLEAN, // тип поля STRING
    defaultValue: false, // пользователь изначально не забанен
  })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
