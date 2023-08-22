import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Order } from './order.model';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: "ORDER_REPOSITORY", // Ім'я провайдера
      useValue: Order, // Клас моделі
    },
  ],
  imports: [SequelizeModule.forFeature([User, Order])],
})
export class OrderModule {}
