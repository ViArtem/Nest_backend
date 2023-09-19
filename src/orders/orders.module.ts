import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { User } from "src/users/users.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [OrdersModule],
})
export class OrdersModule {}
