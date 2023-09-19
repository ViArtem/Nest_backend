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

  async create(createOrderDto: CreateOrderDto): Promise<object> {
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

      // TODO: змінити кількість доступних продуктів
      // TODO: додати в продукти можливість їх отримувати по масиву id

      return {
        error: false,
        success: "Order successfully created",
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllOrders(userId: string) {
    try {
      const allOrders = await this.orderRepository.findAll({
        where: { userId },
      });

      return allOrders;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllActiveOrders() {
    try {
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllClosedOrders() {
    try {
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
