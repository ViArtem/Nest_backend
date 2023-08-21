import { Body, Controller, Post, Inject } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LogInUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: LogInUserDto) {
    return this.authService.auth(loginDto);
  }

  @Post("registration")
  registration(@Body() regDto: CreateUserDto) {
    return this.authService.registration(regDto);
  }
}
