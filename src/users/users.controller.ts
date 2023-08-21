import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get("get/all")
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete("delete")
  deleteUser(@Body() deleteDto: DeleteUserDto) {}
}
