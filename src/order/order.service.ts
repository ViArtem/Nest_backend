import { Injectable, Inject, NotAcceptableException } from '@nestjs/common';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductOnOrder } from './productOnOrder.model';
import { v4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: typeof Order,

    @Inject('PRODUCT_ON_ORDER_REPOSITORY')
    private productOnOrderRepository: typeof ProductOnOrder,
  ) {}

  // ----------------------------------------------------------------------

  async create(orderData: CreateOrderDto): Promise<object> {
    try {
      // create order
      const category = await this.orderRepository.create({
        id: v4(),
        user_id: orderData.user_id,
        addresses: orderData.addresses,
        clientNumber: orderData.clientNumber,
      });

      // create products on order
      const createProductsPromise = orderData.products.map(async (item) => {
        const res = await this.productOnOrderRepository.create({
          order_id: category.id,
          id: v4(),
          price: item.price,
          productName: item.productName,
          quantity: item.quantity,
        });
        return res;
      });

      // result created products on order
      const createProduct = await Promise.all(createProductsPromise);

      return {
        id: category.id,
        user_id: category.user_id,
        addresses: category.addresses,
        clientNumber: category.clientNumber,
        updatedAt: category.updatedAt,
        createdAt: category.createdAt,

        products: createProduct,
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new NotAcceptableException(error.parent.sqlMessage);
      }

      throw error;
    }
  }
}
