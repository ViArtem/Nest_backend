import { Injectable, Inject, HttpException } from "@nestjs/common";
import { Order } from "./order.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { CustomersService } from "src/customers/customers.service";
import * as uuid from "uuid";

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
        const newCustomer = await this.customerService.createCustomer<any>({
          firstName: createOrderDto.customerFirstName,
          lastName: createOrderDto.customerLastName,
          addresses: createOrderDto.customerAddresses,
          contacts: createOrderDto.customerContacts,
          userId: createOrderDto.userId,
          getCustomerData: true,
        });

        createOrderDto.customerId = newCustomer.id;
      }

      const newOrder = await this.orderRepository.create({
        id: uuid.v4(),
        customerId: createOrderDto.customerId,
        productsIds: createOrderDto.products.map(
          (product) => product.productId
        ),
        isActive: true,
        userId: createOrderDto.userId,
      });

      return newOrder;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
