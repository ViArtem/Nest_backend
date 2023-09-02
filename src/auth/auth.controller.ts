import { Body, Controller, Post, Res, Get, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LogInUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Res() res: Response, @Body() loginDto: LogInUserDto) {
    const tokens = await this.authService.auth(loginDto);

    res.cookie("refresh", tokens.refresh, {
      httpOnly: true,
    });

    return res.send({ access: tokens.access });
  }

  @Get("logout")
  async logOut(@Req() req: Request) {
    return await this.authService.logOut(req.body.userId);
  }

  @Post("registration")
  async registration(@Body() regDto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.registration(regDto);

    res.cookie("refresh", tokens.refresh, {
      httpOnly: true,
    });
    return res.send({ access: tokens.access });
  }

  @Get("update/tokens")
  async updateTokens(@Res() res: Response, @Req() req: Request) {
    const refresh = req.cookies.refresh;

    const tokens = await this.authService.updateTokens(refresh);

    res.cookie("refresh", tokens.refresh, {
      httpOnly: true,
    });
    return res.send({ access: tokens.access });
  }
}
