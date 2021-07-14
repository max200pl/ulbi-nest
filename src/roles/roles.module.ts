import { UsersModule } from "./../users/users.module";
import { User } from "src/users/users.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { UserRoles } from "./user-roles.module";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
})
export class RolesModule {}
