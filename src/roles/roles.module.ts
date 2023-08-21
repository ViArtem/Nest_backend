import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { Role } from "./role.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { UserRole } from "./user-role.model";

@Module({
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  providers: [
    RolesService,
    {
      provide: "ROLE_REPOSITORY", // Ім'я провайдера
      useValue: Role, // Клас моделі
    },
  ],
  exports: [RolesService],
})
export class RolesModule {}
