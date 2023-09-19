import { Module, forwardRef } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { Customers } from "./customers.model";
import { OrdersModule } from "src/orders/orders.module";

@Module({
  providers: [
    CustomersService,
    {
      provide: "CUSTOMERS_REPOSITORY",
      useValue: Customers,
    },
  ],
  controllers: [CustomersController],
  imports: [
    SequelizeModule.forFeature([User, Customers]),
    forwardRef(() => OrdersModule),
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
