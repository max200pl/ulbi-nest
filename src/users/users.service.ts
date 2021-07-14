import { RolesService } from "./../roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER"); // получаем USER с базы данных
    await user.$set("roles", [role.id]); //$set позволяет перезаписать данные и сразу перезаписать
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } }); //получение всех полей связанных с пользователем
    return users;
  }
}
