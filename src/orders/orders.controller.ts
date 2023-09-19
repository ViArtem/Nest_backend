import { Controller, Post, Body } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {}
}
