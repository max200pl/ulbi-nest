import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role])],
})
export class RolesModule {}
