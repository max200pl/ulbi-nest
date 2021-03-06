import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseGuards} from "@nestjs/common";
import { Roles } from "src/auth/roles-auth.decorator";
import { UsePipes } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";


@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: "создание пользователя" })
  @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @ApiOperation({ summary: "получить всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/role")
  addRole() {
    return this.usersService.addRole( dto: addRoleDto);
  }
}
