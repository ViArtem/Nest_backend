import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "src/roles/role.model";
import { UserRole } from "src/roles/user-role.model";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
import { Categories } from "src/categories/categories.model";
import { Products } from "src/products/product.model";
import { UserStatistics } from "src/statistics/statistics.model";
import { Customers } from "src/customers/customers.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRole,
      Categories,
      Products,
      UserStatistics,
      Customers,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: "USER_REPOSITORY", // Ім'я провайдера
      useValue: User, // Клас моделі
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
