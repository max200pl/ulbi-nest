import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "user@email", description: "Почта" })
  readonly email: string;
  @ApiProperty({ example: "12345", description: "пароль" })
  readonly password: string;
}
