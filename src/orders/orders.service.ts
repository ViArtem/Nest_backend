import { Injectable, Inject, HttpException } from "@nestjs/common";
import { Order } from "./order.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { CustomersService } from "src/customers/customers.service";
import * as uuid from "uuid";
import { OrderProducts } from "./order-product.model";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class OrdersService {
  constructor(
    @Inject("ORDERS_REPOSITORY")
    private orderRepository: typeof Order,
    @Inject("ORDERPRODUCTS_REPOSITORY")
    private orderProductRepository: typeof OrderProducts,
    private customerService: CustomersService,
    private productService: ProductsService
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

      const orderId = uuid.v4();

      const productsWithOrderId: object[] = createOrderDto.products.map(
        (product) => {
          return {
            orderId: orderId,
            ...product,
          };
        }
      );

      const newOrder = await this.orderRepository.create({
        id: orderId,
        customerId: createOrderDto.customerId,
        isActive: true,
        userId: createOrderDto.userId,
      });

      const orderProducts = await this.orderProductRepository.bulkCreate(
        productsWithOrderId
      );

      const orderProductsGet = await this.orderProductRepository.findAll({
        where: {
          orderId: newOrder.id,
        },
      });

      // TODO: змінити кількість доступних продуктів
      await this.productService.changeCount([
        {
          productId: "1000a94a-1160-493b-b532-7eb1f4340d01",
          name: "test",
          count: 12,
          price: 33,
        },
        {
          productId: "354aede5-0607-440e-8351-cc4bb6a623b9",
          name: "test",
          count: 12,
          price: 33,
        },
      ]);

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
