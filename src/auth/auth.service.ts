import { CreateUserDto } from "./../users/dto/create-user.dto";
import { UsersService } from "./../users/users.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException( // улавливаем ошибку
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5); //для хеширования пароля используем bcrypt (первый параметр пароль, соль)
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    }); // разворачиваем dto и перезаписываем пароль уже кэшированный
    return this.generateToken(user); //
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload), //возвращаем сгенерированный токен
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Некорректный email или пароль ",
    });
  }
}
