import { Module, forwardRef } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { User } from "src/users/users.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { CustomersModule } from "src/customers/customers.module";
import { CustomersService } from "src/customers/customers.service";
import { OrderProducts } from "./order-product.model";
import { ProductsModule } from "src/products/products.module";

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,

    {
      provide: "ORDERS_REPOSITORY",
      useValue: Order,
    },

    {
      provide: "ORDERPRODUCTS_REPOSITORY",
      useValue: OrderProducts,
    },
  ],
  imports: [
    SequelizeModule.forFeature([User, OrderProducts]),
    forwardRef(() => CustomersModule),
    forwardRef(() => ProductsModule),
  ],
  exports: [OrdersModule],
})
export class OrdersModule {}
