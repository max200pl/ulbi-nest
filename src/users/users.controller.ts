import { CreateUserDto } from "./dto/create-user.dto";
import { Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Get } from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
