import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Order } from './order.model';
import { ProductOnOrder } from './productOnOrder.model';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: "ORDER_REPOSITORY", // provide name
      useValue: Order, // class model
    },
    {
      provide: "PRODUCT_ON_ORDER_REPOSITORY", // provide name
      useValue: ProductOnOrder, // class model
    },
  ],
  imports: [SequelizeModule.forFeature([User, Order, ProductOnOrder])],
})
export class OrderModule {}
