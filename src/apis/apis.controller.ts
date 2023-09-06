import { Body, Controller, Get } from "@nestjs/common";
import { ApisService } from "./apis.service";

@Controller("apis")
export class ApisController {
  constructor(private readonly apisService: ApisService) {}
  @Get("get/dollar/rate")
  getDollarRate() {
    return this.apisService.getDollarRate();
  }
}
