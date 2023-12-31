import { Injectable, Inject, HttpException } from "@nestjs/common";
import { Customers } from "./customers.model";
import { CreateCustomerDto } from "./dto/create-customer.dto";

import * as uuid from "uuid";

@Injectable()
export class CustomersService {
  constructor(
    @Inject("CUSTOMERS_REPOSITORY")
    private customersRepository: typeof Customers
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<object> {
    try {
      const customer = await this.customersRepository.create({
        id: uuid.v4(),
        ...createCustomerDto,
      });

      return {
        error: false,
        success: "Customer successfully created",
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getCustomerById(id: string): Promise<object> {
    try {
      const customer = await this.customersRepository.findOne({
        where: {
          id,
        },
      });

      return customer;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllCustomer(userId: string): Promise<object> {
    try {
      const customers = await this.customersRepository.findAll({
        where: {
          userId,
        },
      });

      return customers;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
