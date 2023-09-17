import { Controller, Body, Get, Post, Query } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { CustomersService } from "./customers.service";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post("create")
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get("get/by")
  getCustomerById(@Query("id") id: string) {
    return this.customersService.getCustomerById(id);
  }

  @Post("get/all")
  getAllCustomer(@Body() userData) {
    return this.customersService.getAllCustomer(userData.userId);
  }
}
