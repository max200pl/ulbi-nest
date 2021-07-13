import { User } from "./users.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}