import { Injectable, Inject, HttpException } from "@nestjs/common";
import { Order } from "./order.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { CustomersService } from "src/customers/customers.service";

@Injectable()
export class OrdersService {
  constructor(
    @Inject("ORDERS_REPOSITORY")
    private orderRepository: typeof Order,
    private customerService: CustomersService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      if (!createOrderDto.customerId) {
        // TODO: створити нового замовника та повернути його id
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
