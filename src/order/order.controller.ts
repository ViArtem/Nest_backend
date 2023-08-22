import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("create")
  create(@Body() CreateDto: CreateOrderDto) {
    return this.orderService.create(CreateDto);
  }
}
